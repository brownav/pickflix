const {grabTitles, getMovieList} = require('./grabMovieTitles');
const axios = require('axios');
const _ = require('lodash');
const Movie = require('../models/Movie');
const key = require('../config/keys').OMDB_KEY;
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

mongoose.connect(db)

const addOMDBInfo = async (titleList) => {
  let x = titleList.then((movies) => {
    movies.forEach((movie) => {
      let title = movie.title;
      let year = movie.released_on;
      if (title.indexOf('Marvel\'s') > -1) {
        title = title.slice(9);
      }
      year = year.slice(0, 4);
      const omdbInfo = getOMDBInfo(title, year);
      const mergedInfo = mergeOMDBInfo(movie, omdbInfo);
      mergedInfo.then((info) => {
        let newMovie = _.pick(info,
          ['title', 'avgRating', 'episode_source_count', 'Rated',
          'Released', 'Runtime', 'Genre', 'Director', 'Actors', 'Plot',
          'Awards', 'Poster', 'Ratings', 'Type'])
        let temp = new Movie({
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
        temp.save()
        .then((movie) => {
          console.log('++saved', movie.title);
        })
        .catch((error) => {
          console.log('--shit', error);
        });
      });
    });
  });
  return x
}

const makeAverageRating = (movieInfo) => {
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
  return movieInfo;
};

const mergeOMDBInfo = (movie, omdbInfo) => {
  let mergedInfo = omdbInfo.then((omdbInfo) => {
    omdbInfo = omdbInfo.data;
    let mergingInfo = _.merge(movie, omdbInfo);
    if (mergingInfo.rt_critics_rating && mergingInfo.Ratings) {
        mergingInfo.Ratings.push({'Source': 'Rotten Tomatoes', 'Value': mergingInfo.rt_critics_rating.toString()});
    }
    mergingInfo = _.omit(mergingInfo, ['Title']);
    mergingInfo = _.omit(mergingInfo, ['released_on']);
    mergingInfo = _.merge(mergingInfo, {'avgRating': 'N/A'});
    if (mergingInfo.Actors || mergingInfo.Genre) {
      mergingInfo.Genre = mergingInfo.Genre.split(',');
      mergingInfo.Genre.forEach(function(genre, i) {
        mergingInfo.Genre[i] = mergingInfo.Genre[i].trim()
      })
      mergingInfo.Actors = mergingInfo.Actors.split(',');
    }
    mergingInfo = makeAverageRating(mergingInfo);
    return mergingInfo;
  })
  return mergedInfo;
};

const getOMDBInfo = (title, year) => {
    title = encodeURI(title);
    let URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + title + '&plot=short&r=json&y=' + year;
    const omdbInfo = axios.get(URL)
                  .then((result) => {
                    return result;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
    return omdbInfo;
};

const moviePromises = grabTitles();
const titleList = getMovieList(moviePromises);
addOMDBInfo(titleList);
