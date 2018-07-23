const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const shows = require('./routes/shows')
const cors = require('cors');

const app = express();

// db config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

app.get('/', (req, res) => res.send('sdlfkje'));

// use routes
app.use(cors())
app.use('/movies', movies)
app.use('/shows', shows)

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
