const express = require('express');
const mongoose = require('mongoose');

const app = express();

// db config
const db = require('./config/keys').mongoURI;
// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
