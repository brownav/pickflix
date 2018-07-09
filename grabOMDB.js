const movies = require('./grabMovies.js');
const axios = require('axios');
const _ = require('lodash');
const key = require('./config/keys').OMDB_KEY;

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
  result = _.merge(result, {'avgScore': null}); // adds field for average rating
  addAverage(result);
}

const addAverage = (movie) => {
  // standardize all ratings
  movie.Ratings.forEach(rating => {
    if (rating.Source === 'Internet Movie Database') {
      rating.Value = rating.Value.substr(0, 3);
      rating.Value = parseFloat(rating.Value);
    } else if (rating.Source === 'Rotten Tomatoes' || rating.Source === 'Metacritic') {
      rating.Value = rating.Value.substr(0, 2);
      rating.Value = parseFloat(rating.Value) / 10;
    }
  })
  // if only one score assign as average, else average all ratings
  if (movie.Ratings.length === 1) {
    movie.avgScore = movie.Ratings[0].Value;
  } else if (movie.Ratings.length > 1) {
    let total = 0;
    movie.Ratings.forEach(rating => {
      total += rating.Value;
    })
    movie.avgScore = Number((total / movie.Ratings.length).toFixed(1));
  }
  dbMovies.push(movie);
  console.log(dbMovies.length);
}

timer;
