const axios = require('axios');
const _ = require('lodash');
const key = require('../config/keys').OMDB_KEY;


async function saveMoviesToDB() {
  try {

    const titles = await grabTitles();
    const rawMovies = await processMovieResults(titles);
    const fullMovies = await attachOMDBInfo(rawMovies);
    return await fullMovies// getMovieList
    // const ratedMovies = await addOMDBInfo(rawMovies)
    // const finalMoviesList = await createMovie(ratedMovies);
  } catch (error) {
    console.log(error)
  }
}

// addOMDBInfo
// calls getOMDBInfo(title, year), mergedOMDBInfo(movie, omdbInfo)
async function attachOMDBInfo(movies) {
  let results = []
  movies.forEach((movie) => {
    const URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + encodeURI(movie.title) + '&plot=short&r=json&y=' + movie.released_on;
    axios.get(URL).then((result) => results.push(result.data));
  })
  return await results;
}

async function grabTitles() {
  let skip = 0;
  let i = 20;
  let promises = [];
  while (i < 21) {
    promises.push(axios.get("https://api.reelgood.com/v2/browse/source/netflix?take=5&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"));
    skip += 5;
    i++;
  }
  return await axios.all(promises);
}

function processMovieResults(titles) {
  let rawMovies = []
  titles.forEach((title) => {
    title.data.forEach((item) => {
      let movie = _.pick(item, [
        'title', 'episode_source_count', 'rt_critics_rating', 'released_on'
      ])
      movie.released_on = movie.released_on.slice(0,4);
      // accounts for using OMDB to call Marvel titles
      if (movie.title.indexOf('Marvel\'s') > -1) {
        title = title.slice(9);
      }
      rawMovies.push(movie)
    })
  })
  return rawMovies;
}

saveMoviesToDB().then(titles =>
  setTimeout(function(){
    console.log(titles)}, 5000)
);
