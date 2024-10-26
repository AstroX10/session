# Upload Service

This Upload Service allows users to upload ZIP files to a server and download them using a unique access key. Built with Express and Sequelize, it provides a simple API for file management.

## Features

- Upload ZIP files with a unique access key.
- Download files using the generated access key.
- Supports both JavaScript (CommonJS) and TypeScript (ES6) implementations.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AstroX10/session.git
   cd session
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and define your SQLite storage path:

   ```
   SQLITE_STORAGE=path/to/your/database.sqlite
   ```

## Running the Server

Start the server using:

```bash
node server.js
```

By default, the server runs on `http://localhost:3000`.

## API Endpoints

### Upload File

**POST** `/upload`

- Uploads a ZIP file.
- Returns a JSON response with the access key and upload count.

### Download File

**GET** `/download/:accessKey`

- Downloads the file associated with the given access key.

## Usage

### JavaScript (CommonJS)

#### Upload Example

Create a file named `upload.js`:

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const uploadZipFile = async (filePath) => {
 try {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  const formData = new FormData();
  formData.append('file', fileStream, fileName);

  const response = await axios.post('http://localhost:3000/upload', formData, {
   headers: {
    ...formData.getHeaders(),
   },
  });

  console.log('Upload successful:', response.data);
 } catch (error) {
  console.error('Error uploading the file:', error.response?.data || error.message);
 }
};

uploadZipFile('./test.zip');
```

#### Download Example

Create a file named `download.js`:

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

const accessKey = 'XSTRO_62_72_13';
const downloadPath = path.join(__dirname, 'downloaded_file.zip');
downloadZipFile(accessKey, downloadPath);
```

### TypeScript (ES6)

#### Upload Example

Create a file named `upload.ts`:

```typescript
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const uploadZipFile = async (filePath: string) => {
 try {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  const formData = new FormData();
  formData.append('file', fileStream, fileName);

  const response = await axios.post('http://localhost:3000/upload', formData, {
   headers: {
    ...formData.getHeaders(),
   },
  });

  console.log('Upload successful:', response.data);
 } catch (error) {
  console.error('Error uploading the file:', error.response?.data || error.message);
 }
};

uploadZipFile('./test.zip'); // Path to your ZIP file
```

#### Download Example

Create a file named `download.ts`:

```typescript
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const downloadZipFile = async (accessKey: string, downloadPath: string) => {
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

// Usage
const accessKey = 'XSTRO_62_72_13'; // Replace with your actual access key
const downloadPath = path.join(__dirname, 'downloaded_file.zip'); // Adjust the path as needed
downloadZipFile(accessKey, downloadPath);
```
