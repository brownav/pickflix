const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//  load movie model
const Movie = require('../../models/Movie');
//

// goal is to list all genres on this page
router.get('/', (req, res) => res.json({
  msg: 'genres page works'
}));
//
module.exports = router;
