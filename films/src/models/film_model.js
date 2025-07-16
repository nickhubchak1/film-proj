const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    name: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Film = mongoose.model('Film', FilmSchema);
module.exports = Film;
