# Google Drive Setup for BRSR Copilot

This guide helps you set up Google Drive integration for the BRSR Copilot to access your internal documents and data files.

## Prerequisites

1. Google Cloud Platform (GCP) account
2. Admin access to a Google Drive with BRSR-related documents

## Step 1: Create GCP Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note the project ID

## Step 2: Enable Google Drive API

1. In the GCP Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields (App name, User support email, Developer contact email)
   - Add scopes: `../auth/drive.readonly`
   - Add test users (your email)
4. For application type, choose "Desktop application"
5. Give it a name like "BRSR Copilot"
6. Download the JSON file

## Step 4: Install Credentials

1. Rename the downloaded file to `gcp-oauth.keys.json`
2. Place it in the `server/credentials/` directory
3. The file should look like this:
   ```json
   {
     "installed": {
       "client_id": "your-client-id.googleusercontent.com",
       "project_id": "your-project-id",
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "client_secret": "your-client-secret",
       "redirect_uris": ["http://localhost"]
     }
   }
   ```

## Step 5: Authenticate

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Run the authentication script:
   ```bash
   npm run auth:gdrive
   ```

3. This will:
   - Open a browser window
   - Ask you to sign in to Google
   - Request permission to access your Google Drive (read-only)
   - Save authentication tokens locally

## Step 6: Test the Setup

1. Start the server:
   ```bash
   npm run dev
   ```

2. Check the health endpoint:
   ```bash
   curl http://localhost:3002/health
   ```

3. Look for `"googleDriveEnabled": true` in the response

## Document Organization Tips

For best results with the BRSR Copilot, organize your Google Drive documents:

### Recommended Folder Structure
```
📁 BRSR Reporting/
├── 📁 Templates & Guidelines/
│   ├── BRSR_Template_2024.pdf
│   ├── SEBI_BRSR_Guidelines.pdf
│   └── Industry_Best_Practices.pdf
├── 📁 Previous Submissions/
│   ├── BRSR_2023_Final.pdf
│   ├── BRSR_2022_Final.pdf
│   └── Draft_Reviews/
├── 📁 ESG Data/
│   ├── Environmental_Metrics.xlsx
│   ├── Social_Impact_Data.csv
│   ├── Governance_Indicators.xlsx
│   └── Third_Party_Audits/
└── 📁 Policies & Procedures/
    ├── Environmental_Policy.pdf
    ├── Code_of_Conduct.pdf
    └── Stakeholder_Engagement.pdf
```

### File Naming Conventions
- Use descriptive names with keywords
- Include dates in format YYYY-MM-DD
- Use underscores instead of spaces
- Examples:
  - `BRSR_Environmental_Metrics_2024-03-31.xlsx`
  - `Stakeholder_Engagement_Policy_v2.pdf`
  - `Third_Party_Verification_Report_2024.pdf`

## Troubleshooting

### Authentication Fails
- Ensure OAuth consent screen is properly configured
- Check that Google Drive API is enabled
- Verify the credentials file is valid JSON
- Make sure you're using the correct Google account

### No Documents Found
- Check file permissions (documents must be accessible to the authenticated user)
- Use more specific search terms
- Ensure documents contain searchable text (not just images)

### Permission Denied
- Verify the OAuth scope includes `https://www.googleapis.com/auth/drive.readonly`
- Re-run the authentication process
- Check that the authenticated user has access to the documents

## Security Notes

- The server only requests read-only access to your Google Drive
- Authentication tokens are stored locally in `credentials/.gdrive-server-credentials.json`
- Never commit credential files to version control
- Regularly review and rotate OAuth credentials

## Support

For issues specific to Google Drive integration:
1. Check the server logs for detailed error messages
2. Verify your GCP project configuration
3. Test with a simple document first
4. Ensure network access to Google APIs