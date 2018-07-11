const axios = require('axios');
const _ = require('lodash');

let totalResults = [];
let timer = setInterval(function(){grabMovies()}, 1000);

const grabMovies = () => {
  let skip = 0,
      i = 0,
      promises = [],
      URL = "https://api.reelgood.com/v2/browse/source/netflix?take=250&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix";

  while (i < 21) {
    promises.push(axios.get(URL))
    skip = skip + 250;
    i++;
  }
  clearInterval(timer);
  processMovies(promises);
};


async function processMovies (promises) {
  console.log('in procesmovies...');
  let results = await axios.all(promises).then((results) => {
    results.forEach((response) => {
      response.data.forEach((item) => {
        let movie = _.pick(item, [
          'title', 'content_type',
          'episode_source_count'
        ])
        totalResults.push(movie);
        returnMovieList(totalResults)
      })
    })
  })
}

async function returnMovieList (totalResults) {
  for (let i = 0; i < totalResults.length; i++) {
    console.log(totalResults[i].title + ' - ' + i);
  }

}



timer;

module.exports = totalResults;
