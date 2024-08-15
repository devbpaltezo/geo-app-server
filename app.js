require("dotenv").config({path: './.env'});

const express = require('express');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use(require('cors')());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/geo', require('./routes/geo'));
app.use('/api/history', require('./routes/history'));

app.get('/api/check', (req, res) => { res.json("Hello!") });

sequelize.sync().then(() => {
  app.listen(3100, () => console.log('Server running on port 3100'));
});