const axios = require('axios');
const _ = require('lodash');

let movieBatch = 250
let URL = "https://api.reelgood.com/v2/browse/source/netflix?take=" + movieBatch + "&skip=0&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"

// until the response is empty array, make request and increment movieBatch

const grabMovies = () => {
  axios.get(URL)
    .then((response) => {
      movieList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const movieList = (movies) => {
  let movieList = [];
  for (let i = 0; i < movies.length; i++) {
    let movie = _.pick(movies[i], [
      'title', 'content_type',
      'episode_source_count'
    ]);
  movieList.push(movie);
  }
  console.log(`${movieList.length}`);
}


// // for page do
const movieChunk = grabMovies();

//   Movies.insertMany(movieChunk);

//module.exports = {listMovies};
