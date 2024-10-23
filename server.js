const express = require('express');
const sequelize = require('./database/sequelize');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

sequelize.sync().then(() => {
 app.listen(8000, () => console.log('Server running on http://localhost:8000'));
});
