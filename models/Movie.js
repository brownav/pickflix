const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const movieSchema = new Schema({
  type: String,
  title: String,
  episode_count: Number,
  rated: String,
  released: Date,
  genres: Array,
  plot: String,
  awards: String,
  image: String,
  ratings: Array,
  avg_rating: Number,
  director: String,
  actors: Array
})

// method to render all movies based on genre types?
// https://docs.mongodb.com/manual/indexes/

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie = mongoose.model('Movie', movieSchema);
