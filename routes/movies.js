const express = require('express');
const router = express.Router();

// load movie module
const Movie = require('../models/Movie');

// all genres for movies
const movieGenres = ["Action", "Crime", "Drama", "Adventure", "Comedy",
                "Animation", "Family", "Fantasy", "Sci-Fi", "Thriller",
                "Biography", "History", "Romance", "Short", "Mystery",
                "Documentary", "Horror", "War", "Sport", "Musical",
                "Music", "N/A", "Western", "Reality-TV", "News",
                "Talk-Show", "Film-Noir", "Adult"]

// gets all movies
router.get('/', (req, res) => {
  Movie.find({ contentType: 'movie'})
  .sort({avgRating: -1})
  .then(movies => res.send(movies))
  .catch(err => res.status(err))
})

// gets all movie genres
router.get('/genres', (req, res) => {
  Movie.distinct("genres", {contentType: 'movie'})
  .then(movies => res.send(movies))
  .catch(err => res.status(err))
})


// gets all movies for specific genre
movieGenres.forEach(function(genre) {
  let lcgenre = genre.toLowerCase();
  router.get('/' + lcgenre, (req, res) => {
    Movie.find({ contentType: 'movie', genres: genre })
    .sort({ avgRating: -1 })
    .then(movies => res.send(movies))
    .catch(err => res.status(err))
  })
})

module.exports = router;
