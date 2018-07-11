const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//  load movie model
const Movie = require('../../models/Movie');
//


// aim is ot display all movies per genre i.e. api/comedy/movies
router.get('/', (req, res) => res.json({
  test
}));
//

module.exports = router;
