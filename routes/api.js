const express = require('express');
const path = require('path');
const upload = require('../middleware/upload');
const Session = require('../models/Session');
const generateSession = require('../utils/sessionGenerator');
const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
 try {
  const sessionKey = generateSession();
  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  await Session.create({ sessionKey, filePath });
  const userCount = await Session.count();
  res.json({ session: sessionKey, users: userCount });
 } catch (error) {
  res.status(500).json({ error: 'Failed to upload file' });
 }
});

router.post('/download', async (req, res) => {
 try {
  const { sessionKey } = req.body;
  const session = await Session.findOne({ where: { sessionKey } });
  if (!session) return res.status(404).json({ error: 'Invalid session key' });
  res.download(session.filePath);
 } catch (error) {
  res.status(500).json({ error: 'Failed to download file' });
 }
});

module.exports = router;
