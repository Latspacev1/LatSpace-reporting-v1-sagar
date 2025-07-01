# Google Drive Integration Setup Guide

This guide will help you set up Google Drive integration for the CDP Reporting Assistant with RAG capabilities.

## Prerequisites

- Google Cloud Account
- Node.js v16 or higher
- Access to Google Drive with documents

## Step 1: Google Cloud Project Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/projectcreate)
   - Create a new project named "CDP-MCP-GDrive"
   - Note your Project ID

2. **Enable Google Drive API**
   - Visit [API Library](https://console.cloud.google.com/apis/library)
   - Search for "Google Drive API"
   - Click "Enable"

3. **Configure OAuth Consent Screen**
   - Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
   - Select:
     - "Internal" for Google Workspace
     - "External" for personal accounts
   - Fill in:
     - App name: "CDP MCP GDrive Server"
     - User support email: your email
     - Developer contact: your email
   - Add scope: `https://www.googleapis.com/auth/drive.readonly`
   - Save and continue

4. **Create OAuth Credentials**
   - Go to [Credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Desktop app"
   - Name: "CDP MCP Desktop Client"
   - Download the JSON file
   - Save it as: `gdrive-mcp-server/credentials/gcp-oauth.keys.json`

## Step 2: MCP Server Authentication

1. **Run Authentication**
   ```bash
   cd gdrive-mcp-server
   node dist/index.js auth
   ```

2. **Complete OAuth Flow**
   - A browser window will open
   - Sign in with your Google account
   - Grant permissions
   - Credentials will be saved automatically

## Step 3: Running the MCP Server

1. **Start MCP Server**
   ```bash
   cd gdrive-mcp-server
   node dist/index.js
   ```
   The server will run on a default port (usually 3000)

2. **Environment Variables**
   Add to your `.env` file:
   ```env
   MCP_SERVER_URL=http://localhost:3000
   GOOGLE_DRIVE_FOLDER_ID=your-folder-id (optional)
   ```

## Step 4: Document Organization

### Recommended Google Drive Structure
```
CDP Documents/
├── Guidelines/
│   ├── CDP_Climate_Change_2024.pdf
│   ├── CDP_Water_Security_2024.pdf
│   └── CDP_Forests_2024.pdf
├── Reports/
│   ├── Annual_Report_2023.pdf
│   └── Sustainability_Report_2023.pdf
├── Data/
│   ├── Emissions_Data_2023.xlsx
│   └── Energy_Consumption_2023.xlsx
└── Templates/
    ├── CDP_Response_Template.docx
    └── Data_Collection_Template.xlsx
```

### Document Types Supported
- **PDF**: Reports, guidelines, policies
- **DOCX**: Templates, documentation
- **XLSX**: Data sheets, calculations
- **PPTX**: Presentations, training materials
- **Google Docs/Sheets/Slides**: Automatically converted

## Step 5: Testing the Integration

1. **Test Search**
   ```javascript
   // The agent will use:
   await gdrive_search({ query: "CDP climate change guidelines" });
   ```

2. **Test File Reading**
   ```javascript
   // The agent will use:
   await gdrive_read_file({ file_id: "file-id-from-search" });
   ```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure OAuth credentials are in the correct location
   - Check file permissions
   - Verify scopes in Google Cloud Console

2. **Connection Issues**
   - Check if MCP server is running
   - Verify firewall settings
   - Ensure correct port configuration

3. **File Access Issues**
   - Verify files are in Google Drive
   - Check sharing permissions
   - Ensure OAuth scope includes drive.readonly

## Security Notes

- OAuth tokens are stored locally in `credentials/`
- Never commit credentials to version control
- Use read-only access for security
- Regularly review access logs in Google Cloud Console

## Next Steps

After setup:
1. Upload your CDP-related documents to Google Drive
2. Organize them in a logical folder structure
3. Test the chatbot with queries about your documents
4. Monitor usage and performance