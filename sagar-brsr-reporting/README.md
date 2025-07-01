# BRSR Reporting Platform

A comprehensive Business Responsibility & Sustainability Reporting (BRSR) platform with AI-powered assistance for completing BRSR disclosures.

## Features

- **Interactive BRSR Questionnaire**: Navigate through all BRSR sections with guided workflows
- **AI-Powered Copilot**: Get intelligent assistance with ASK and WRITE modes
- **Document Integration**: Search and access your Google Drive documents
- **Web Search**: Get current information on BRSR regulations and best practices
- **Real-time Collaboration**: Work on disclosures with your team

## Architecture

This platform consists of:
- **Frontend**: React application with TypeScript and Tailwind CSS
- **Backend**: Express server with OpenAI Agents SDK
- **AI Integration**: GPT-4 with web search and Google Drive RAG capabilities

## Quick Start

### 1. Frontend Setup

```bash
cd project-cdp
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup

```bash
cd server
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your-api-key-here

# Start the server
npm run dev
```

The backend will be available at `http://localhost:3002`

### 3. Google Drive Integration (Optional)

Follow the detailed guide in `server/GOOGLE_DRIVE_SETUP.md` to enable document search and access.

```bash
# After setting up GCP credentials
cd server
npm run auth:gdrive
```

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
OPENAI_API_KEY=your-openai-api-key-here
PORT=3002
NODE_ENV=development
```

## Development

### Frontend Development
```bash
cd project-cdp
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
cd server
npm run dev     # Start with hot reload
npm run build   # Compile TypeScript
npm run start   # Start production server
```

### Concurrent Development
To run both frontend and backend simultaneously, you can use tools like `concurrently`:

```bash
# Install concurrently globally
npm install -g concurrently

# From the root directory
concurrently "cd project-cdp && npm run dev" "cd server && npm run dev"
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and feature availability.

### Chat (Basic)
```
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "What is BRSR?"
    }
  ]
}
```

### Chat with Search
```
POST /api/chat-with-search
Content-Type: application/json

{
  "messages": [...],
  "enableSearch": true
}
```

Returns enhanced responses with web search results and Google Drive documents.

## BRSR Context

The platform is designed specifically for **Business Responsibility & Sustainability Reporting (BRSR)** which is:

- Mandatory for top 1000 companies by market cap in India
- Focuses on Environmental, Social & Governance (ESG) disclosures  
- Based on 9 principles covering various aspects of sustainable business practices
- Requires both qualitative disclosures and quantitative KPIs

### BRSR Principles

1. **Principle 1**: Businesses should conduct and govern themselves with integrity in a manner that is Ethical, Transparent and Accountable
2. **Principle 2**: Businesses should provide goods and services in a manner that is sustainable and safe
3. **Principle 3**: Businesses should respect and promote the well-being of all employees
4. **Principle 4**: Businesses should respect the interests of and be responsive to all its stakeholders
5. **Principle 5**: Businesses should respect and promote human rights
6. **Principle 6**: Businesses should respect and make efforts to protect and restore the environment
7. **Principle 7**: Businesses when engaging in influencing public and regulatory policy should do so in a manner that is responsible and transparent
8. **Principle 8**: Businesses should promote inclusive growth and equitable development
9. **Principle 9**: Businesses should engage with and provide value to their consumers in a responsible manner

## Copilot Modes

### ASK Mode
- Get answers to specific BRSR questions
- Search web for latest regulations and guidance
- Access your Google Drive documents
- Research best practices and benchmarking

### WRITE Mode  
- Get help drafting specific sections
- Receive suggestions for improving responses
- Generate content based on your data
- Review and refine existing disclosures

## File Structure

```
sagar-brsr-reporting/
├── project-cdp/                 # Frontend React application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/           # API services
│   │   └── data/               # Mock data and types
│   ├── public/                 # Static assets
│   └── package.json
├── server/                     # Backend Express server
│   ├── services/               # Google Drive integration
│   ├── credentials/            # OAuth credentials (not in git)
│   ├── server.ts              # Main server file
│   └── package.json
└── README.md                   # This file
```

## Security & Privacy

- All API keys and credentials are stored locally
- Google Drive integration uses read-only permissions
- No data is stored on external servers
- OpenAI API calls are made server-side for security

## Troubleshooting

### Common Issues

1. **OpenAI API errors**: Verify your API key is correct and has sufficient credits
2. **Google Drive not working**: Follow the setup guide in `GOOGLE_DRIVE_SETUP.md`
3. **CORS errors**: Ensure the backend is running on port 3002
4. **Frontend not loading**: Check that dependencies are installed with `npm install`

### Logs

Check server logs for detailed error information:
```bash
cd server
npm run dev
# Server logs will show in the terminal
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Sagar Reporting Platform.

## Support

For technical support or questions about BRSR reporting requirements, please contact the development team.