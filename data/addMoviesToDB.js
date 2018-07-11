const movies = require('./grabOMDB.js')
const mongoose = require('mongoose');
const Movie = require('../src/models/Movie');
const db = require('../config/keys').mongoURI;
mongoose.connect(db);

const timer = setTimeout(function(){createCollection(movies)}, 30000);

const createCollection = (movies) => {
  console.log('in add movies to db...');
  // console.log(movies);

  movies.forEach(movie => {
    let temp = new Movie({
      title: movie.title,
      contentType: movie.content_type,
      episodeCount: movie.episode_source_count,
      rated: movie.Rated,
      released: movie.Released,
      genres: movie.Genre,
      plot: movie.Plot,
      awards: movie.Awards,
      image: movie.Poster,
      ratings: movie.Ratings,
      avgRating: movie.avgRating,
      director: movie.Director,
      actors: movie.Actors
    })


    // mongoose.model(Movie, temp )

    setTimeout(function() {
      console.log('in save');
      // mongoose.model(Movie, temp )
      temp.save(function(error, temp) {
        if (error) return console.error(error);
        console.log(temp.title + ' added to db');
      })
      // console.log(temp);
      // jsonfile.writeFileSync(file, temp, {flag: 'a'})
    }, 1000);

    // temp.save(function(error, temp) {
    //   if (error) return console.error(error);
    //   console.log(temp.title + ' added to db');
    // })
  })

}


timer;
