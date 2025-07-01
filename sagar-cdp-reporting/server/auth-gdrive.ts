import { googleDriveService } from './services/googleDrive.js';

async function runAuthentication() {
    console.log('Starting Google Drive authentication...');
    console.log('Make sure you have placed your OAuth credentials at:');
    console.log('  credentials/gcp-oauth.keys.json');
    console.log('');
    
    const success = await googleDriveService.authenticate();
    
    if (success) {
        console.log('✅ Authentication successful!');
        console.log('You can now use Google Drive in the chatbot.');
    } else {
        console.log('❌ Authentication failed.');
        console.log('Please check your credentials and try again.');
    }
    
    process.exit(success ? 0 : 1);
}

runAuthentication();