const express = require('express');
const mongoose = require('mongoose');
const {listMovies} = require('./grabMovies.js')
const app = express();

// db config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

app.get('/', (req, res) => res.send(`${listMovies}`));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));