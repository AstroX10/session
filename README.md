## Session Manager

A Simple Server for managing session

### SETUP

Here’s a compact Node.js code to handle the upload and download of files programmatically using Axios for HTTP requests.

### **1. Uploading a ZIP file using Node.js**

```js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const form = new FormData();
form.append('file', fs.createReadStream('./path/to/your/file.zip'));
axios
 .post('http://localhost:3000/api/upload', form, { headers: form.getHeaders() })
 .then((res) => console.log(res.data))
 .catch((err) => console.error('Error:', err));
```

### **2. Downloading a ZIP file using Node.js**

```js
const axios = require('axios');
const fs = require('fs');
const sessionKey = 'XSTRO_25_82_91';
axios
 .post('http://localhost:3000/api/download', { sessionKey }, { responseType: 'stream' })
 .then((res) => {
  const writer = fs.createWriteStream('./path/to/save/downloaded.zip');
  res.data.pipe(writer);
  writer.on('finish', () => console.log('File downloaded successfully'));
 })
 .catch((err) => console.error('Error:', err));
```

- **Upload**: This uses `FormData` to handle file uploads, attaching the `.zip` file to a POST request.

- **Download**: This sends the `sessionKey` in a POST request and streams the downloaded `.zip` file to the specified path.

### EXTRACT AFTER DOWNLOADING?

```bash
npm install axios unzipper
```

```js
const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');

const sessionKey = 'XSTRO_25_82_91';
const downloadPath = './path/to/save/downloaded.zip';
const extractPath = './path/to/extract/';

axios
 .post('http://localhost:3000/api/download', { sessionKey }, { responseType: 'stream' })
 .then((res) => {
  const writer = fs.createWriteStream(downloadPath);
  res.data.pipe(writer);
  writer.on('finish', () => {
   fs
    .createReadStream(downloadPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .on('close', () => console.log('File downloaded and extracted successfully'));
  });
 })
 .catch((err) => console.error('Error:', err));
```

### License

MIT License

Copyright (c) 2024 Astro

Permission is hereby granted, free of charge, to any person obtaining a copy
