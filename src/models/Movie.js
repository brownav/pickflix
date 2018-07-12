const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const movieSchema = new Schema({
  contentType: {
    type: String
  },
  title: {
    type: String
  },
  episodeCount: {
    type: Number
  },
  rated: {
    type: String
  },
  released: {
    type: Schema.Types.Mixed
  },
  genres: {
    type: Array
  },
  plot: {
    type: String
  },
  awards: {
    type: String
  },
  image: {
    type: String
  },
  ratings: {
    type: Array
  },
  avgRating: {
    type: Schema.Types.Mixed
  },
  director: {
    type: String
  },
  actors: {
    type: Array
  },
  runtime: {
    type: String
  }
});

// method to render all movies based on genre types?
// https://docs.mongodb.com/manual/indexes/


module.exports = mongoose.model('Movie', movieSchema);
