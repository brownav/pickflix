const express = require('express');
const mongoose = require('mongoose');
const movies = require('../routes/api/movies');
const shows = require('../routes/api/shows')
const cors = require('cors');

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
app.use(cors())
app.use('/api/movies', movies)
app.use('/api/shows', shows)

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
