const movies = require('./grabMovies.js');
const axios = require('axios');
const _ = require('lodash');


let movieAttributes = [];
const timer = setTimeout(function(){grabOMDB(movies)}, 7000);

const grabOMDB = (movies) => {
  movies.forEach(movie => {
    let title = encodeURI(movie.title);
    let URL = 'http://www.omdbapi.com/?apikey=f8b7352&t=' + title + '&plot=short&r=json';
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
  result = _.omit(result, ['title']);
  console.log(result.Title);
}

timer;
