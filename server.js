const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const shows = require('./routes/shows')
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 4000;

const app = express();

// db config
const db = require('./config/keys').MONGODB_URI;

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

app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(port, () => console.log(`Server running on port ${port}`));
