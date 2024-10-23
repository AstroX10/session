const express = require('express');
const fs = require('fs');
const path = require('path');
const sequelize = require('./database/sequelize');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

sequelize.sync().then(() => {
 app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
