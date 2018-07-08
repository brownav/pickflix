const axios = require('axios');
const _ = require('lodash');

let movieList = [];

let timer = setInterval(function(){grabMovies()}, 5000);

const grabMovies = () => {
  let skip = 0;
  let URL = "https://api.reelgood.com/v2/browse/source/netflix?take=3&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix";
  let i = 0;
  while (i < 1) {
    axios.get(URL)
    .then((response) => {
      formatMovies(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    skip = skip + 250;
    i++;
  }
  clearInterval(timer);
};

const formatMovies = (movies) => {
  for (let i = 0; i < movies.length; i++) {
    let movie = _.pick(movies[i], [
      'title', 'content_type',
      'episode_source_count'
    ]);
    addToList(movie);
  }
  // console.log(movieList);
  // console.log(`${movieList.length}`);
  return movieList;
};

const addToList = (movie) => {
  movieList.push(movie);
  // console.log(`${movieList.length}) ` + movie.title);
};


timer;

module.exports = movieList;
