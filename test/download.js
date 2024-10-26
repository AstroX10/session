import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadZipFile = async (accessKey, downloadPath) => {
 try {
  const response = await axios.get(`http://localhost:3000/download/${accessKey}`, {
   responseType: 'stream',
  });

  const fileStream = fs.createWriteStream(downloadPath);
  response.data.pipe(fileStream);

  fileStream.on('finish', () => {
   console.log(`Download successful: ${downloadPath}`);
  });

  fileStream.on('error', (err) => {
   console.error('Error writing to file:', err.message);
  });
 } catch (error) {
  console.error('Error downloading the file:', error.response?.data || error.message);
 }
};

const accessKey = '';
const downloadPath = path.join(__dirname, 'downloaded.zip');
downloadZipFile(accessKey, downloadPath);
