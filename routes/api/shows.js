const express = require('express');
const router = express.Router();

//  load movie model
const Movie = require('../../models/Movie');

const showGenres = ["Drama", "Romance", "Fantasy", "Horror", "Comedy",
                "Mystery", "Sci-Fi", "Crime", "Action", "Adventure",
                "Animation", "Thriller", "Family", "Music", "Biography",
                "Reality-TV", "Sport", "Documentary", "History", "Talk-Show",
                "Western", "N/A", "Musical", "War", "Game-Show", "News", "Short"]

// gets all shows
router.get('/', (req, res) => {
  Movie.find({ contentType: 'series'})
  .sort({avgRating: -1})
  .then(movies => res.send(movies))
  .catch(err => res.status(err))
})

// gets all genres for shows
router.get('/genres', (req, res) => {
  Movie.distinct("genres", { contentType: 'series' })
  .then(movies => res.send(movies))
  .catch(err => res.status(err))
})

// gets all shows for specific genre
showGenres.forEach(function(genre) {
  let lcgenre = genre.toLowerCase();
  router.get('/' + lcgenre, (req, res) => {
    Movie.find({ contentType: 'series', genres: genre })
    .sort({ avgRating: -1 })
    .then(movies => res.send(movies))
    .catch(err => res.status(err))
  })
})

module.exports = router;
