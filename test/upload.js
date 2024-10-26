import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

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
