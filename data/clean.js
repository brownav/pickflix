const axios = require('axios');
const _ = require('lodash');
const key = require('../config/keys').OMDB_KEY;


async function saveMoviesToDB() {
  try {
    const titles = await grabTitles();
    const rawTitles = await processTitleResults(titles);
    const fullMovies = await attachOMDBInfo(rawTitles);
    const cleanMovies = await cleanFullMovies(fullMovies);
    return cleanMovies
    // const ratedMovies = await addOMDBInfo(rawMovies)
    // const finalMoviesList = await createMovie(ratedMovies);
  } catch (error) {
    console.log(error)
  }
}


async function cleanFullMovies(movies) {
  for (const movie of movies) {
    console.log(movie);
  }
  console.log('done');
  // movieList.forEach(async (movie) => {
  //   console.log(movie);
  //   if (movie.rt_ratings && movie.Ratings) {
  //      movie.Ratings.push({'Source': 'Rotten Tomatoes', 'Value': movie.rt_critics_rating.toString()});
  //   }
  //
  //   movie = _.omit(movie, ['Title', 'released_on']);
  //   movie = _.merge(movie, {'avgRating': 'N/A'});
  //
  //   if (movie.Actors || movie.Genre) {
  //     movie.Actors = movie.Actors.split(',');
  //     movie.Genre = movie.Genre.split(',');

      // movie.Genre.forEach(function(genre, i) {
      //   movie.Genre[i] = movie.Gengre[i].trim();
      // }
  }


function attachOMDBInfo(titles) {
  let results = [];
  titles.forEach((title) => {
    console.log(title.title);
    const URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + encodeURI(title.title) + '&plot=short&r=json&y=' + title.released_on;
    axios.get(URL)
    .then(result => {
      console.log(title.title);
      let mergedMovie = _.merge(result.data, title);
      results.push(mergedMovie);
    })
  })
  return results;
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

function processTitleResults(titles) {
  let rawMovies = []
  titles.forEach((title) => {
    title.data.forEach((item) => {
      let movie = _.pick(item, [
        'title', 'episode_source_count', 'rt_critics_rating', 'released_on'
      ])
      movie.released_on = movie.released_on.slice(0,4);
      // accounts for using OMDB to call Marvel titles
      if (movie.title.indexOf('Marvel\'s') > -1) {
        title = title.slice(8);
      }
      rawMovies.push(movie)
    })
  })
  return rawMovies;
}

saveMoviesToDB().then(titles =>
  setTimeout(function(){
    console.log(titles)}, 2000)
);
