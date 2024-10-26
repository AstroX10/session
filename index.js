import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_STORAGE,
  logging: false,
});

const ZipFile = sequelize.define('ZipFile', {
  accessKey: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isZipExtension = path.extname(file.originalname).toLowerCase() === '.zip';
    if (isZipExtension) cb(null, true);
    else cb(new Error('Only ZIP files are allowed.'));
  },
});

app.use(express.static('public'));
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  const accessKey = `XSTRO_${crypto.randomInt(10, 100)}_${crypto.randomInt(10, 100)}_${crypto.randomInt(10, 100)}`;
  try {
    await ZipFile.create({ accessKey, filePath: req.file.path });
    const uploadCount = await ZipFile.count();
    res.status(201).json({ accessKey, uploadCount });
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ error: 'Failed to save file.' });
  }
});

app.get('/download/:accessKey', async (req, res) => {
  const { accessKey } = req.params;
  const zipFile = await ZipFile.findOne({ where: { accessKey } });
  if (zipFile) {
    res.download(zipFile.filePath, (err) => {
      if (err) res.status(500).send('Error downloading the file.');
    });
  } else {
    res.status(404).send('File not found.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

(async () => {
  try {
    await sequelize.sync();
    console.log('SQLite connected and synced');
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
