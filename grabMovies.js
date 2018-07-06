const axios = require('axios');
const _ = require('lodash');

let take = 250
let skip = 0 + 250
let URL = "https://api.reelgood.com/v2/browse/source/netflix?take=" + take + "&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"
const movieList = []

const grabMovies = () => {
  axios.get(URL)
    .then((response) => {
      formatMovies(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const formatMovies = (movies) => {
  for (let i = 0; i < movies.length; i++) {
    let movie = _.pick(movies[i], [
      'title', 'content_type',
      'episode_source_count'
    ]);
    addToList(movie);
  }
  console.log(movieList);
  console.log(`${movieList.length}`);
}

const addToList = (movie) => {
  movieList.push(movie);
}


let movieChunk = grabMovies();

// Movies.insertMany(movieChunk);

//module.exports = {listMovies};
