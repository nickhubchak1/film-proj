const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const Film = require('./src/models/film_model');

app.get('/', (req, res) => {
  res.json({ msg: 'films' });
});

app.get('/api/v1/films', async (req, res) => {
  try {
    const films = await Film.find(); 
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch films' });
  }
});

app.post('/api/v1/films', async (req, res) => {
  const { name, rating } = req.body;

  try {
    let film = await Film.findOne({ name });

    if (film) {
      film.rating = rating;
    } else {
      film = new Film({ name, rating });
    }

    const savedFilm = await film.save();
    res.json(savedFilm);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save film' });
  }
});

module.exports = app;
