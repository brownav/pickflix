const axios = require('axios');
const _ = require('lodash');

async function grabTitles() {
  let skip = 0,
      i = 20
  while (i < 21) {
    try {
      let response = await axios.get("https://api.reelgood.com/v2/browse/source/netflix?take=250&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix");
      return response.data
    } catch (error){
      console.log(error)
    }
    skip = skip + 250;
    i++;
  }
}

async function getMovieList (promises) {
  let totalResults = [];
  try {
    let results = await promises
    results.forEach((item) => {
        let movie = _.pick(item, [
          'title', 'episode_source_count',
          'rt_critics_rating', 'released_on'
        ])
        totalResults.push(movie);
      })
  } catch (error) {
    console.log(error)
  }
  return totalResults;
}

module.exports = {grabTitles, getMovieList};
