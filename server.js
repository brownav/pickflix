const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/api/movies');
const shows = require('./routes/api/shows')
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 4000;

const app = express();

// db config
const db = require('./config/keys').MONGODB_URI;

// connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log(error));

// use routes
app.use(cors())
app.use('/api/movies', movies)
app.use('/api/shows', shows)

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => console.log(`Server running on port ${port}`));
