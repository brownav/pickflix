const axios = require('axios');
const _ = require('lodash');
const key = require('../config/keys').OMDB_KEY;
const Movie = require('../models/Movie');
const mongoose = require('mongoose');
const db = require('../config/keys').MONGODB_URI;
mongoose.connect(db, {
  useNewUrlParser: true
});

async function populateDBWithMovies() {
  try {
    const titles = await grabTitles();
    const rawTitles = await processTitleResults(titles)
    const fullMovies = await attachOMDBInfo(rawTitles);
    const cleanMovies = await cleanFullMovies(fullMovies);
    return await saveMoviesToDB(cleanMovies);
  } catch (error) {
    console.log(error)
  }
}

function saveMoviesToDB(movies) {
  let i = 0;
  for(movie of movies) {
    let newMovie = _.pick(movie,
      ['title', 'avgRating', 'episode_source_count', 'Rated',
      'Released', 'Runtime', 'Genre', 'Director', 'Actors', 'Plot',
      'Awards', 'Poster', 'Ratings', 'Type'])
    let x = Movie({
       title: newMovie.title,
       contentType: newMovie.Type,
       episodeCount: newMovie.episode_source_count,
       rated: newMovie.Rated,
       released: newMovie.Released,
       genres: newMovie.Genre,
       plot: newMovie.Plot,
       awards: newMovie.Awards,
       image: newMovie.Poster,
       ratings: newMovie.Ratings,
       avgRating: newMovie.avgRating,
       director: newMovie.Director,
       actors: newMovie.Actors,
       runtime: newMovie.Runtime,
    })
    x.save()
    i++;
    console.log(i, x.title);
  }
}


function makeAverageRating(movieInfo) {
  if (movieInfo.Ratings) {
    movieInfo.Ratings = _.uniqBy(movieInfo.Ratings, 'Source')
    let total = 0;
    movieInfo.Ratings.forEach(rating => {
      if (rating.Source === 'Internet Movie Database') {
        rating.Value = rating.Value.substr(0, 3);
        rating.Value = parseFloat(rating.Value);
        total += rating.Value;
      }
      if (rating.Source === 'Rotten Tomatoes' || rating.Source === 'Metacritic') {
        rating.Value = rating.Value.substr(0, 2);
        if (rating.Value === '10') {
          rating.Value = 10;
          total += 10;
        } else {
          rating.Value = parseFloat(rating.Value) / 10;
          total += rating.Value;
        }
      }
    })
    movieInfo.avgRating = Number((total / movieInfo.Ratings.length).toFixed(1));
  }
  return movieInfo
}

function cleanFullMovies(movies) {
  let cleanMovies = []
  for(movie of movies) {
    if (movie.rt_ratings && movie.Ratings) {
      movie.Ratings.push({'Source': 'Rotten Tomatoes', 'Value': movie.rt_critics_rating.toString()});
    }
    movie = _.omit(movie, ['Title', 'released_on']);

    movie = _.merge(movie, {'avgRating': 'N/A'});
    movie = makeAverageRating(movie)

    if (movie.Actors || movie.Genre) {
      movie.Actors = movie.Actors.split(',');
      movie.Genre = movie.Genre.split(',');
      movie.Genre.forEach((genre, i) => {
        movie.Genre[i] = movie.Genre[i].trim()})
    }
    cleanMovies.push(movie)
  }
  return cleanMovies;
}



async function attachOMDBInfo(titles) {
  let results = [];
  for (title of titles) {
    const URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + encodeURI(title.title) + '&plot=short&r=json&y=' + title.released_on;
    let result = await axios.get(URL);
    let mergedMovie = _.merge(result.data, title);
    console.log(mergedMovie.title)
    results.push(mergedMovie);
  }
  return results;
}   


function grabTitles() {
  let skip = 0;
  let i = 0;
  let promises = [];
  while (i < 21) {
    promises.push(axios.get("https://api.reelgood.com/v2/browse/source/netflix?take=250&skip=" + skip + "&&year_start=1900&year_end=2018&availability=onSources&hide_seen=false&hide_tracked=false&hide_watchlisted=false&content_kind=both&sources=netflix&sort=0&free=false&override_user_sources=true&overriding_sources=netflix"));
    skip += 250;
    i++;
  }
  return axios.all(promises);
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
        movie.title = movie.title.slice(8);
      }
      rawMovies.push(movie)
    })
  })
  return rawMovies;
}

populateDBWithMovies().then((result) => {
  console.log(result)
})
