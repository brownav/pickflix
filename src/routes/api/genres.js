const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../../../config/keys').mongoURI;

mongoose.connect(db)

//  load movie model
const Movie = require('../../models/Movie');
//

// goal is to list all genres on this page

router.get('/', (req, res) => {
  Movie.find()
    .then(movies => res.send(movies))
    .catch(err => res.status(err))
})

// router.get('/', (req,res, next) {
//   Movie.find({} function (err, movies) {
//     if (err)
//     return next(err);
//     res.json(movies)
//   })
// });

// use pickflix;
// db.getCollection("movies").find(
//     {
//         "genres" : /.*Adventure.*/i
//     }
// );
//
module.exports = router;
