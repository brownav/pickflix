const axios = require('axios');
const _ = require('lodash');

const URL = "https://api.reelgood.com/v2/browse/source/netflix?take=250&skip=0&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"

const listMovies = () => {
  axios.get(URL)
    .then((response) => {

    for (let i = 0; i < response.data.length; i++) {
      let movie = _.pick(response.data[i], [
        'title', 'content_type',
        'episode_source_count'
      ]);
      console.log(movie);
    }
    })
    .catch((error) => {
      console.log(error);
    });
}

// // for page do
const movieChunk = listMovies();
//   Movies.insertMany(movieChunk);

//module.exports = {listMovies};
