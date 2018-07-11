const axios = require('axios');
const _ = require('lodash');

const grabTitles = () => {
  let skip = 0,
      i = 0,
      promises = []
  while (i < 1) {
    promises.push(axios.get("https://api.reelgood.com/v2/browse/source/netflix?take=2&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"))
    skip = skip + 250;
    i++;
  }
  return promises;
};


async function processMovies (promises) {
  let results = await axios.all(promises).then((results) => {
    let totalResults = [];
    results.forEach((response) => {
      response.data.forEach((item) => {
        let movie = _.pick(item, [
          'title', 'episode_source_count'
        ])
        totalResults.push(movie);
      })
    })
    return totalResults;
  })
  return results
}

async function getMovieList (promises) {
  let movieList = await processMovies(promises);
  return movieList
}

processMovies();
module.exports = {grabTitles, getMovieList};
