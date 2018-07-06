const axios = require('axios');
const _ = require('lodash');

let movieList = []

// 4,857 titles
const grabMovies = () => {
  let skip = 0
  let i = 0;
  while (i < 2) {
    axios.get("https://api.reelgood.com/v2/browse/source/netflix?take=250&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix")
    .then((response) => {
      formatMovies(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    // console.log('skip = ' + skip);
    skip = skip + 250;
    i++;
  }
}

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
}

const addToList = (movie) => {
  movieList.push(movie);
  // console.log(`${movieList.length}) ` + movie.title);
}




// Movies.insertMany(movieChunk);
// module.exports.grabMovies = grabMovies;
module.exports.movieList = movieList;
