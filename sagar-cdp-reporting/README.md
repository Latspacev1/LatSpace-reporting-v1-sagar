# Sagar CDP Reporting with AI Chatbot

This application provides a CDP (Carbon Disclosure Project) reporting interface with an integrated AI chatbot that has web search capabilities.

## Features

- **Interactive CDP Questionnaire**: Complete climate disclosure forms
- **AI Chatbot**: Get help with CDP requirements and current climate information
- **Web Search**: The chatbot can search the web for up-to-date information
- **ASK/WRITE Modes**: Toggle between asking questions and content generation

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd server
   npm install
   cd ..
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env` and add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   PORT=3001
   ```

3. **Run the application:**
   
   **Option 1: Run both frontend and backend together**
   ```bash
   npm run dev:full
   ```
   
   **Option 2: Run separately**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

## Access

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## Chatbot Usage

1. Click the brain icon to open the chatbot panel
2. Toggle between **ASK** and **WRITE** modes
3. In ASK mode, ask questions about:
   - CDP reporting requirements
   - Current climate regulations
   - Environmental disclosure standards
   - General climate-related information

The chatbot will automatically search the web when it needs current information to answer your questions.

## API Endpoints

- `POST /api/chat-with-search` - Chat with web search capabilities
- `POST /api/chat` - Simple chat without search
- `GET /health` - Health check

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: OpenAI Agents SDK with GPT-4
- **Web Search**: OpenAI WebSearchTool (hosted by OpenAI)