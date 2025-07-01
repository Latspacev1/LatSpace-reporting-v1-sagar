// Frontend service for communicating with the backend API
// All OpenAI API calls are handled by the secure backend

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Backend chat request failed');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Failed to get response from chat service');
  }
};

// Enhanced chat with web search and Google Drive capabilities
export const sendChatMessageWithSearch = async (
  messages: ChatMessage[],
  enableSearch: boolean = true
): Promise<{ response: string; searchResults?: SearchResult[]; driveFiles?: any[] }> => {
  try {
    const response = await fetch('/api/chat-with-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, enableSearch }),
    });

    if (!response.ok) {
      throw new Error('Backend chat with search request failed');
    }

    return response.json();
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Failed to get response from chat service');
  }
};