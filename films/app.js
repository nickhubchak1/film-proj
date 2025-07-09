const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const films = [];

app.get('/', (req, res) => {
  res.json({ msg: 'films' });
});

app.get('/api/v1/films', (req, res) => {
  res.json(films);
});

app.post('/api/v1/films', (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  const film = { name, rating };
  films.push(film);
  res.json(film);
});

module.exports = app;
