const express = require('express');
const connection = require('./config/db');
require('dotenv').config();
const heroRoute = require('./routes/hero.routes');
const villainRoute = require('./routes/villain.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/heroes', heroRoute);
app.use('/villains', villainRoute);

app.listen(process.env.port, async () => {
  await connection;
  console.log(`listening on port ${process.env.port}`);
});
