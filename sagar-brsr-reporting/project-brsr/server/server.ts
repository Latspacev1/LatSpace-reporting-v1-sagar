import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Agent, run, webSearchTool, tool } from '@openai/agents';
import { z } from 'zod';
import { googleDriveService } from './services/googleDrive.js';

dotenv.config({ path: '../.env' });

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is required');
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 3002;

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

// Create the BRSR Research Assistant Agent with both Web Search and Google Drive tools
const agent = new Agent({
    name: 'BRSR Research Assistant',
    instructions: `You are a helpful assistant specializing in BRSR (Business Responsibility & Sustainability Reporting) disclosures. 
    
    You have access to two powerful information sources:
    
    1. **Google Drive**: Contains internal documents, reports, guidelines, and data files related to BRSR reporting.
       - Use search_google_drive to find relevant documents
       - Use read_google_drive_file to read specific documents
       - Prioritize Drive documents for BRSR-specific information, internal data, and historical reports
    
    2. **Web Search**: For current information, latest regulations, and external sources.
       - Use web search for recent updates, news, and external references
    
    When answering questions:
    - First search Google Drive for relevant internal documents
    - If needed, supplement with web search for current information
    - Always cite your sources (document names for Drive, URLs for web)
    - Combine information from both sources for comprehensive answers
    
    BRSR Context:
    - BRSR is mandatory for top 1000 companies by market cap in India
    - Focuses on Environmental, Social & Governance (ESG) disclosures
    - Nine principles covering leadership, products, employee well-being, stakeholder engagement, human rights, environment, public policy, inclusive growth, and customer value
    - Requires both qualitative disclosures and quantitative Key Performance Indicators (KPIs)
    
    Common document types in Drive:
    - BRSR templates and guidelines (PDF)
    - Previous years' submissions (PDF/DOCX)
    - ESG data and metrics (XLSX/CSV)  
    - Internal sustainability reports (PDF/PPTX)
    - Policy documents and procedures (PDF/DOCX)
    - Third-party verification reports (PDF)`,
    tools: [
        webSearchTool(),
        searchGoogleDriveTool,
        readGoogleDriveFileTool
    ],
    model: 'gpt-4o'
});

console.log('BRSR Research Assistant created with Web Search and Google Drive RAG');

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ 
        status: 'ok', 
        message: 'BRSR Server is running',
        agentReady: true,
        webSearchEnabled: true,
        googleDriveEnabled: isDriveInitialized
    });
});

// Simple test endpoint
app.post('/api/test', (req: express.Request, res: express.Response) => {
    try {
        console.log('Test endpoint called');
        res.json({ 
            status: 'ok', 
            message: 'Test endpoint working',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Test endpoint error:', error);
        res.status(500).json({ 
            error: 'Test endpoint failed',
            details: error.message 
        });
    }
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
        
        console.log('Processing BRSR message:', userMessage);
        console.log('Session ID:', sessionId);

        // Use the OpenAI agent to process the message
        const result = await run(agent, userMessage);
        
        // Extract search results and drive files from the result
        let searchResults = [];
        let driveFiles = [];
        
        // Parse the result to extract structured data if available
        if (result.messages && result.messages.length > 0) {
            const lastMessage = result.messages[result.messages.length - 1];
            
            // Check if the response contains structured data
            if (lastMessage.content && typeof lastMessage.content === 'string') {
                try {
                    // Try to parse any JSON-like content for search results
                    const jsonMatch = lastMessage.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        if (parsed.searchResults) searchResults = parsed.searchResults;
                        if (parsed.driveFiles) driveFiles = parsed.driveFiles;
                    }
                } catch (e) {
                    // Ignore parsing errors
                }
            }
        }

        res.json({ 
            response: result.text || result.content || 'No response generated',
            searchResults,
            driveFiles
        });

    } catch (error: any) {
        console.error('Chat endpoint error:', error);
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
        
        // Mock response for testing
        const response = `Hello! I'm your BRSR assistant. You said: "${userMessage}". This is a test response while we debug the OpenAI agents integration.`;
        
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
        console.log(`BRSR Server running on port ${port}`);
        console.log('OpenAI Agents SDK with Web Search and Google Drive RAG ready');
        if (!isDriveInitialized) {
            console.log('⚠️  Google Drive not configured. See GOOGLE_DRIVE_SETUP.md for instructions.');
        }
    });
}

startServer();