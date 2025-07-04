import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Agent, run, webSearchTool, tool } from '@openai/agents';
import { z } from 'zod';
import { googleDriveService } from './services/googleDrive.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Google Drive service
let isDriveInitialized = false;

async function initializeServices() {
    console.log('Initializing services...');
    isDriveInitialized = await googleDriveService.initialize();
    if (isDriveInitialized) {
        console.log('Google Drive service ready');
    } else {
        console.log('Google Drive service not configured. Run "npm run auth:gdrive" to set up.');
    }
}

// Custom Google Drive tools
const searchGoogleDriveTool = tool({
    name: 'search_google_drive',
    description: 'Search for files in Google Drive containing specific keywords or phrases',
    parameters: z.object({
        query: z.string().describe('The search query to find relevant documents')
    }),
    execute: async (input) => {
        if (!isDriveInitialized) {
            return JSON.stringify({ error: 'Google Drive not configured' });
        }
        
        try {
            const results = await googleDriveService.searchFiles(input.query);
            return JSON.stringify({
                query: input.query,
                count: results.length,
                files: results.map(file => ({
                    id: file.id,
                    name: file.name,
                    mimeType: file.mimeType,
                    modifiedTime: file.modifiedTime,
                    size: file.size
                }))
            });
        } catch (error) {
            return JSON.stringify({ error: 'Search failed', details: error.message });
        }
    }
});

const readGoogleDriveFileTool = tool({
    name: 'read_google_drive_file',
    description: 'Read the contents of a specific file from Google Drive using its file ID',
    parameters: z.object({
        fileId: z.string().describe('The Google Drive file ID to read'),
        fileName: z.string().nullable().describe('The file name for context')
    }),
    execute: async (input) => {
        if (!isDriveInitialized) {
            return JSON.stringify({ error: 'Google Drive not configured' });
        }
        
        try {
            const result = await googleDriveService.readFile(input.fileId);
            return JSON.stringify({
                fileId: input.fileId,
                fileName: input.fileName,
                mimeType: result.mimeType,
                content: result.content.substring(0, 5000), // Limit content length
                truncated: result.content.length > 5000
            });
        } catch (error) {
            return JSON.stringify({ error: 'Failed to read file', details: error.message });
        }
    }
});

// Create the CDP Research Assistant Agent with both Web Search and Google Drive tools
const agent = new Agent({
    name: 'CDP Research Assistant',
    instructions: `You are a helpful assistant specializing in CDP (Carbon Disclosure Project) climate change disclosures. 
    
    You have access to two powerful information sources:
    
    1. **Google Drive**: Contains internal documents, reports, guidelines, and data files related to CDP reporting.
       - Use search_google_drive to find relevant documents
       - Use read_google_drive_file to read specific documents
       - Prioritize Drive documents for CDP-specific information, internal data, and historical reports
    
    2. **Web Search**: For current information, latest regulations, and external sources.
       - Use web search for recent updates, news, and external references
    
    When answering questions:
    - First search Google Drive for relevant internal documents
    - If needed, supplement with web search for current information
    - Always cite your sources (document names for Drive, URLs for web)
    - Combine information from both sources for comprehensive answers
    
    Common document types in Drive:
    - CDP questionnaires and guidelines (PDF)
    - Previous years' submissions (PDF/DOCX)
    - Emissions data (XLSX/CSV)
    - Internal sustainability reports (PDF/PPTX)
    - Policy documents (PDF/DOCX)`,
    tools: [
        webSearchTool(),
        searchGoogleDriveTool,
        readGoogleDriveFileTool
    ],
    model: 'gpt-4o'
});

console.log('CDP Research Assistant created with Web Search and Google Drive RAG');

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        agentReady: true,
        webSearchEnabled: true,
        googleDriveEnabled: isDriveInitialized
    });
});

// Chat endpoint with both web search and Google Drive RAG
app.post('/api/chat-with-search', async (req: express.Request, res: express.Response) => {
    try {
        const { messages, enableSearch } = req.body;
        const sessionId = (req.headers['x-session-id'] as string) || 'default-session';

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        // Get the user's message
        const userMessage = messages[messages.length - 1].content;
        
        console.log('Processing message with Agents SDK:', userMessage);
        console.log('Session ID:', sessionId);

        // Use the OpenAI Agents SDK to run the agent
        const result = await run(agent, userMessage);

        console.log('Agent response received');

        // Extract the response
        const response = result.finalOutput || 'I apologize, but I could not generate a response.';

        // Extract tool usage information
        let searchResults: any[] = [];
        let driveFiles: any[] = [];
        
        if (result.steps) {
            for (const step of result.steps) {
                if (step.toolCalls) {
                    for (const toolCall of step.toolCalls) {
                        // Handle web search results
                        if (toolCall.tool === 'web_search' && toolCall.result) {
                            try {
                                const searchData = typeof toolCall.result === 'string' 
                                    ? JSON.parse(toolCall.result) 
                                    : toolCall.result;
                                
                                if (searchData.results) {
                                    searchResults = searchData.results.slice(0, 5).map((result: any) => ({
                                        title: result.title || 'No title',
                                        url: result.url || '',
                                        content: result.snippet || result.content || 'No content available',
                                        source: 'web'
                                    }));
                                }
                            } catch (parseError) {
                                console.log('Could not parse web search results:', parseError);
                            }
                        }
                        
                        // Handle Google Drive search results
                        if (toolCall.tool === 'search_google_drive' && toolCall.result) {
                            try {
                                const driveData = typeof toolCall.result === 'string' 
                                    ? JSON.parse(toolCall.result) 
                                    : toolCall.result;
                                
                                if (driveData.files) {
                                    driveFiles = driveData.files.map((file: any) => ({
                                        id: file.id,
                                        name: file.name,
                                        mimeType: file.mimeType,
                                        modifiedTime: file.modifiedTime,
                                        source: 'drive'
                                    }));
                                }
                            } catch (parseError) {
                                console.log('Could not parse Drive search results:', parseError);
                            }
                        }
                    }
                }
            }
        }

        res.json({ 
            response,
            searchResults: searchResults.length > 0 ? searchResults : undefined,
            driveFiles: driveFiles.length > 0 ? driveFiles : undefined
        });

    } catch (error: any) {
        console.error('Agents SDK error:', error);
        res.status(500).json({ 
            error: 'An error occurred',
            details: error.message 
        });
    }
});

// Simple chat endpoint without search (for backwards compatibility)
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
    try {
        const { messages } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        const userMessage = messages[messages.length - 1].content;
        
        // Create a simple agent without tools for basic chat
        const simpleAgent = new Agent({
            name: 'CDP Assistant',
            instructions: 'You are a helpful assistant specializing in CDP Climate disclosures.',
            model: 'gpt-4o'
        });

        const result = await run(simpleAgent, userMessage);
        const response = result.finalOutput || 'No response generated';
        
        res.json({ response });

    } catch (error: any) {
        console.error('Simple chat error:', error);
        res.status(500).json({ 
            error: 'Failed to process chat request',
            details: error.message 
        });
    }
});

// Google Drive authentication endpoint
app.post('/api/auth/google-drive', async (req: express.Request, res: express.Response) => {
    try {
        const success = await googleDriveService.authenticate();
        if (success) {
            isDriveInitialized = true;
            res.json({ success: true, message: 'Google Drive authenticated successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Authentication failed' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start server and initialize services
async function startServer() {
    await initializeServices();
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log('OpenAI Agents SDK with Web Search and Google Drive RAG ready');
        if (!isDriveInitialized) {
            console.log('⚠️  Google Drive not configured. See GOOGLE_DRIVE_SETUP.md for instructions.');
        }
    });
}

startServer();