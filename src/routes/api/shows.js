const express = require('express');
const router = express.Router();

//  load movie model
const Movie = require('../../models/Movie');
//

router.get('/', (req, res) => {
  Movie.find({ contentType: 'series'})
  .sort({avgRating: -1})
  .then(movies => res.send(movies))
  .catch(err => res.status(err))
})

// aim is ot display all movies per genre i.e. api/comedy/movies
router.get('/', (req, res) => res.json({
  test
}));
//

module.exports = router;
