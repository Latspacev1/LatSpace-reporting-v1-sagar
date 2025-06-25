import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Store assistant ID and threads
let assistantId: string | null = null;
const threads: Map<string, string> = new Map();

// Initialize assistant on server startup
async function initializeAssistant() {
    try {
        console.log('Creating CDP Research Assistant...');
        const assistant = await openai.beta.assistants.create({
            name: 'CDP Research Assistant',
            instructions: 'You are a helpful assistant specializing in CDP (Carbon Disclosure Project) climate change disclosures. Help users understand and complete their CDP reporting requirements. You have access to web search functionality through the searchWeb function. Use it when users ask questions that require current information.',
            tools: [{
                type: 'function',
                function: {
                    name: 'searchWeb',
                    description: 'Search the web for current information about a topic',
                    parameters: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string',
                                description: 'The search query to find information about'
                            }
                        },
                        required: ['query']
                    }
                }
            }],
            model: 'gpt-4-turbo-preview'
        });
        assistantId = assistant.id;
        console.log('Assistant created successfully with ID:', assistantId);
    } catch (error) {
        console.error('Failed to create assistant:', error);
        throw error;
    }
}

// Simple web search function using DuckDuckGo API
async function searchWeb(query: string) {
    try {
        const response = await axios.get('https://api.duckduckgo.com/', {
            params: {
                q: query,
                format: 'json',
                no_html: '1',
                skip_disambig: '1'
            }
        });

        const results = response.data.RelatedTopics || [];
        const searchResults = results.slice(0, 5).map((topic: any) => ({
            title: topic.Text ? topic.Text.split(' - ')[0] : 'No title',
            content: topic.Text || 'No content available',
            url: topic.FirstURL || ''
        }));

        return JSON.stringify({
            query,
            results: searchResults,
            summary: response.data.Abstract || 'No summary available'
        });
    } catch (error) {
        console.error('Web search failed:', error);
        return JSON.stringify({
            query,
            error: 'Web search failed',
            results: []
        });
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        assistantReady: assistantId !== null
    });
});

// Chat endpoint with web search
app.post('/api/chat-with-search', async (req: express.Request, res: express.Response) => {
    try {
        const { messages, enableSearch } = req.body;
        const sessionId = (req.headers['x-session-id'] as string) || 'default-session';

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        if (!assistantId) {
            return res.status(503).json({ error: 'Assistant not initialized' });
        }

        // Get or create thread for this session
        let threadId = threads.get(sessionId);
        
        if (!threadId) {
            console.log('Creating new thread for session:', sessionId);
            const thread = await openai.beta.threads.create();
            threadId = thread.id;
            threads.set(sessionId, threadId);
            console.log('Created thread:', threadId);
        }

        // Add the user's message to the thread
        const lastUserMessage = messages[messages.length - 1].content;
        await openai.beta.threads.messages.create(
            threadId,
            {
                role: 'user',
                content: lastUserMessage
            }
        );

        // Create and poll run
        console.log('Creating run for thread:', threadId);
        const run = await openai.beta.threads.runs.create(
            threadId,
            {
                assistant_id: assistantId
            }
        );

        // Poll for completion
        let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        
        while (runStatus.status === 'queued' || runStatus.status === 'in_progress' || runStatus.status === 'requires_action') {
            if (runStatus.status === 'requires_action') {
                console.log('Run requires action - handling function calls');
                const toolCalls = runStatus.required_action?.submit_tool_outputs.tool_calls;
                
                if (toolCalls) {
                    const toolOutputs = [];
                    for (const toolCall of toolCalls) {
                        if (toolCall.function.name === 'searchWeb') {
                            console.log('Executing web search');
                            const args = JSON.parse(toolCall.function.arguments);
                            const searchResult = await searchWeb(args.query);
                            toolOutputs.push({
                                tool_call_id: toolCall.id,
                                output: searchResult
                            });
                        }
                    }
                    
                    // Submit tool outputs
                    await openai.beta.threads.runs.submitToolOutputs(
                        threadId,
                        run.id,
                        { tool_outputs: toolOutputs }
                    );
                }
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
            console.log('Run status:', runStatus.status);
        }

        if (runStatus.status === 'completed') {
            // Retrieve messages
            const threadMessages = await openai.beta.threads.messages.list(threadId);
            
            // Find the assistant's response
            const assistantMessage = threadMessages.data.find(msg => msg.role === 'assistant');
            
            if (assistantMessage && assistantMessage.content[0]?.type === 'text') {
                const responseText = assistantMessage.content[0].text.value;
                
                // Check if web search was used (you can parse annotations if needed)
                const searchResults = assistantMessage.content[0].text.annotations || [];
                
                res.json({ 
                    response: responseText,
                    searchResults: searchResults.length > 0 ? searchResults : undefined
                });
            } else {
                res.json({ 
                    response: 'I apologize, but I could not generate a response.',
                    searchResults: []
                });
            }
        } else {
            console.error('Run failed with status:', runStatus.status);
            res.status(500).json({ 
                error: 'Failed to process request',
                status: runStatus.status,
                details: runStatus.last_error?.message
            });
        }

    } catch (error: any) {
        console.error('API error:', error);
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

        // Use the standard chat completions API for simple chat
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000,
        });

        const response = completion.choices[0]?.message?.content || 'No response generated';
        res.json({ response });

    } catch (error: any) {
        console.error('Chat API error:', error);
        res.status(500).json({ 
            error: 'Failed to process chat request',
            details: error.message 
        });
    }
});

// Start server and initialize assistant
async function startServer() {
    try {
        await initializeAssistant();
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Assistant ready with ID: ${assistantId}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();