import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';
import { authenticate } from '@google-cloud/local-auth';

export class GoogleDriveService {
  private auth: OAuth2Client | null = null;
  private drive: any = null;
  private credentialsPath: string;
  private tokenPath: string;

  constructor() {
    // Paths relative to server directory
    this.credentialsPath = path.join(process.cwd(), 'credentials', 'gcp-oauth.keys.json');
    this.tokenPath = path.join(process.cwd(), 'credentials', '.gdrive-server-credentials.json');
  }

  async initialize() {
    try {
      // Check if credentials file exists
      await fs.access(this.credentialsPath);
      
      // Try to load saved token
      try {
        await fs.access(this.tokenPath);
        const token = JSON.parse(await fs.readFile(this.tokenPath, 'utf-8'));
        const credentials = JSON.parse(await fs.readFile(this.credentialsPath, 'utf-8'));
        
        this.auth = new OAuth2Client(
          credentials.installed.client_id,
          credentials.installed.client_secret,
          credentials.installed.redirect_uris[0]
        );
        this.auth.setCredentials(token);
      } catch (error) {
        // Token doesn't exist, need to authenticate
        console.log('No saved credentials found. Please run authentication.');
        return false;
      }

      this.drive = google.drive({ version: 'v3', auth: this.auth });
      console.log('Google Drive service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Drive service:', error);
      return false;
    }
  }

  async authenticate() {
    try {
      const auth = await authenticate({
        keyfilePath: this.credentialsPath,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });

      // Save credentials for future use
      const credentials = await auth.credentials;
      await fs.writeFile(this.tokenPath, JSON.stringify(credentials));
      
      this.auth = auth;
      this.drive = google.drive({ version: 'v3', auth: this.auth });
      
      console.log('Authentication successful!');
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  async searchFiles(query: string): Promise<any[]> {
    if (!this.drive) {
      throw new Error('Google Drive service not initialized');
    }

    try {
      const response = await this.drive.files.list({
        q: `fullText contains '${query}' and trashed = false`,
        fields: 'files(id, name, mimeType, modifiedTime, size, webViewLink)',
        pageSize: 10,
        orderBy: 'modifiedTime desc'
      });

      return response.data.files || [];
    } catch (error) {
      console.error('Search failed:', error);
      throw new Error('Failed to search Google Drive');
    }
  }

  async readFile(fileId: string): Promise<{ content: string; mimeType: string }> {
    if (!this.drive) {
      throw new Error('Google Drive service not initialized');
    }

    try {
      // Get file metadata
      const metadataResponse = await this.drive.files.get({
        fileId: fileId,
        fields: 'mimeType, name'
      });

      const mimeType = metadataResponse.data.mimeType;
      let content = '';

      // Handle different file types
      switch (mimeType) {
        case 'application/vnd.google-apps.document':
          // Export Google Docs as plain text
          const docResponse = await this.drive.files.export({
            fileId: fileId,
            mimeType: 'text/plain'
          }, { responseType: 'text' });
          content = docResponse.data;
          break;

        case 'application/vnd.google-apps.spreadsheet':
          // Export Google Sheets as CSV
          const sheetResponse = await this.drive.files.export({
            fileId: fileId,
            mimeType: 'text/csv'
          }, { responseType: 'text' });
          content = sheetResponse.data;
          break;

        case 'application/vnd.google-apps.presentation':
          // Export Google Slides as plain text
          const slidesResponse = await this.drive.files.export({
            fileId: fileId,
            mimeType: 'text/plain'
          }, { responseType: 'text' });
          content = slidesResponse.data;
          break;

        case 'application/pdf':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          // For binary files, we'll return a message
          // In production, you'd want to use libraries to parse these
          content = `[Binary file: ${metadataResponse.data.name}. Content extraction for ${mimeType} requires additional processing.]`;
          break;

        case 'text/plain':
        case 'text/csv':
        case 'application/json':
          // Download text files directly
          const textResponse = await this.drive.files.get({
            fileId: fileId,
            alt: 'media'
          }, { responseType: 'text' });
          content = textResponse.data;
          break;

        default:
          content = `[Unsupported file type: ${mimeType}]`;
      }

      return { content, mimeType };
    } catch (error) {
      console.error('Failed to read file:', error);
      throw new Error('Failed to read file from Google Drive');
    }
  }

  // Helper function to get folder contents
  async listFolderContents(folderId?: string): Promise<any[]> {
    if (!this.drive) {
      throw new Error('Google Drive service not initialized');
    }

    try {
      let query = 'trashed = false';
      if (folderId) {
        query = `'${folderId}' in parents and trashed = false`;
      }

      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name, mimeType, modifiedTime, size)',
        pageSize: 50,
        orderBy: 'folder,name'
      });

      return response.data.files || [];
    } catch (error) {
      console.error('Failed to list folder contents:', error);
      throw new Error('Failed to list folder contents');
    }
  }
}

// Singleton instance
export const googleDriveService = new GoogleDriveService();