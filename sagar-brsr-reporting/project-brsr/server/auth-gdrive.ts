import { googleDriveService } from './services/googleDrive.js';

async function authenticateGoogleDrive() {
  console.log('🔧 Setting up Google Drive authentication...');
  console.log('');
  console.log('This will open a browser window for you to authenticate with Google.');
  console.log('Make sure you have:');
  console.log('  1. Created a GCP project with Google Drive API enabled');
  console.log('  2. Downloaded OAuth 2.0 credentials as credentials/gcp-oauth.keys.json');
  console.log('');
  
  try {
    const success = await googleDriveService.authenticate();
    
    if (success) {
      console.log('✅ Google Drive authentication successful!');
      console.log('   Credentials saved to credentials/.gdrive-server-credentials.json');
      console.log('');
      console.log('🚀 You can now start the server with: npm run dev');
    } else {
      console.log('❌ Authentication failed. Please check:');
      console.log('   1. Your credentials file is valid');
      console.log('   2. Google Drive API is enabled in your GCP project');
      console.log('   3. OAuth consent screen is configured');
    }
  } catch (error) {
    console.error('❌ Authentication error:', error);
    console.log('');
    console.log('📖 Please refer to GOOGLE_DRIVE_SETUP.md for detailed setup instructions.');
  }
}

// Run authentication
authenticateGoogleDrive();