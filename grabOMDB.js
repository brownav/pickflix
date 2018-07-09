const movies = require('./grabMovies.js');
const axios = require('axios');
const _ = require('lodash');
const key = require('./config/keys').OMDB_KEY;
const async = require('async');

let dbMovies = [];
const timer = setTimeout(function(){grabOMDB(movies)}, 7000);

const grabOMDB = (movies) => {
  movies.forEach(movie => {
    let title = encodeURI(movie.title);
    let URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + title + '&plot=short&r=json';
    axios.get(URL)
    .then((response) => {
      formatMovie(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  });
};

const formatMovie = (attributes) => {
  let movie = _.pick(attributes, [
    'Released', 'Genre', 'Plot', 'Awards',
    'Poster', 'Title', 'Ratings', 'Director', 'Actors'
  ]);
  addAttributes(movie);
}

const addAttributes = (movieAttributes) => {
  for (let i = 0; i < movies.length; i++) {
   Object.assign(movies[i], movieAttributes[i]);
  }
  let result = movies.find(x => x.title === movieAttributes.Title)
  result = _.merge(result, movieAttributes);
  result = _.omit(result, ['title']); // removes redundant title field
  result = _.merge(result, {'avgRating': null}); // adds field for average rating
  addAverage(result);
}


const addAverage = (movie) => {
  let total = 0;
  // standardize all ratings
  movie.Ratings.forEach(rating => {
    if (rating.Source === 'Internet Movie Database') {
      rating.Value = rating.Value.substr(0, 3);
      rating.Value = parseFloat(rating.Value);
      total += rating.Value;
    }

    if (rating.Source === 'Rotten Tomatoes' || rating.Source === 'Metacritic') {
      rating.Value = rating.Value.substr(0, 2);
      if (rating.Value === '10') {
        total += 10
      } else {
        rating.Value = parseFloat(rating.Value) / 10;
        total += rating.Value;
      }
    }
  })
  movie.avgRating = Number((total / movie.Ratings.length).toFixed(1));
  console.log(" ");
  console.log(movie.Title + ' - ' +  movie.avgRating + ' -- ' + dbMovies.length);
  dbMovies.push(movie);
}


timer;
