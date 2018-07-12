const express = require('express');
const mongoose = require('mongoose');
const genres = require('../routes/api/genres');
const movies = require('../routes/api/movies');
// const Movie = require('../models/Movie');


const app = express();

// db config
const db = require('../../config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

app.get('/', (req, res) => res.send('sdlfkje'));

// use routes
app.use('/api/genres', genres);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
