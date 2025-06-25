import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Agent, run, webSearchTool } from '@openai/agents';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Store conversation sessions
const sessions: Map<string, any[]> = new Map();

// Create the CDP Research Assistant Agent with WebSearchTool
const agent = new Agent({
    name: 'CDP Research Assistant',
    instructions: `You are a helpful assistant specializing in CDP (Carbon Disclosure Project) climate change disclosures. 
    
    Help users understand and complete their CDP reporting requirements. When users ask questions that require current information about:
    - Latest CDP reporting requirements
    - Recent climate regulations 
    - Current carbon pricing trends
    - Environmental disclosure standards
    - Climate policy updates
    
    Use the web search tool to find up-to-date information and provide accurate, well-researched responses.`,
    tools: [webSearchTool()],
    model: 'gpt-4o' // Use gpt-4o which supports web search
});

console.log('CDP Research Assistant created with WebSearchTool');

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        agentReady: true,
        webSearchEnabled: true
    });
});

// Chat endpoint with web search using OpenAI Agents SDK
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

        // Check if web search was used by looking at the steps
        const searchUsed = result.steps && result.steps.some((step: any) => 
            step.toolCalls && step.toolCalls.some((call: any) => call.tool === 'web_search')
        );

        // Extract search results if available
        let searchResults: any[] = [];
        if (searchUsed && result.steps) {
            for (const step of result.steps) {
                if (step.toolCalls) {
                    for (const toolCall of step.toolCalls) {
                        if (toolCall.tool === 'web_search' && toolCall.result) {
                            // Parse the search results
                            try {
                                const searchData = typeof toolCall.result === 'string' 
                                    ? JSON.parse(toolCall.result) 
                                    : toolCall.result;
                                
                                if (searchData.results) {
                                    searchResults = searchData.results.slice(0, 5).map((result: any) => ({
                                        title: result.title || 'No title',
                                        url: result.url || '',
                                        content: result.snippet || result.content || 'No content available'
                                    }));
                                }
                            } catch (parseError) {
                                console.log('Could not parse search results:', parseError);
                            }
                        }
                    }
                }
            }
        }

        res.json({ 
            response,
            searchResults: searchResults.length > 0 ? searchResults : undefined
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
        
        // Create a simple agent without web search for basic chat
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

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('OpenAI Agents SDK WebSearchTool ready');
});