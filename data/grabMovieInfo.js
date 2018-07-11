const {grabTitles, getMovieList} = require('./grabMovieTitles');
const axios = require('axios');
const _ = require('lodash');
const Movie = require('../src/models/Movie');
const key = require('../config/keys').OMDB_KEY;

console.log('in grab movie info');

const addOMDBInfo = async (titleList) => {
  let x = titleList.then((movies) => {
    let mergedInfos = [];
      movies.forEach((movie) => {
        let title = movie.title;
        const omdbInfo = getOMDBInfo(title);
        const mergedInfo = mergeOMDBInfo(movie, omdbInfo);
        mergedInfo.then((info) => {
          console.log(info);
          // let newMovie = _.pick(info, ['title', 'avgRating'])
          // newMovie = new Movie(newMovie)
          // newMovie.save().then((doc) => {
          //   console.log("++Saved", doc.title);
          // }, (error) => {
          //   console.log("--Unable", doc.title);
          // });
        });
        mergedInfos.push(mergedInfo);
    });
    return mergedInfos;
  });
  return x;
};

const makeAverageRating = (movieInfo) => {
  if (movieInfo.Ratings) {
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
          total += 10
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
    mergingInfo = _.omit(mergingInfo, ['Title']);
    mergingInfo = _.merge(mergingInfo, {'avgRating': null});
    if (mergingInfo.Actors || mergingInfo.Genre) {
      mergingInfo.Genre = mergingInfo.Genre.split(',');
      mergingInfo.Actors = mergingInfo.Actors.split(',');
    }
    mergingInfo = makeAverageRating(mergingInfo);
    return mergingInfo;
  })
  return mergedInfo;
};

const getOMDBInfo = (title) => {
  title = encodeURI(title);
  let URL = 'http://www.omdbapi.com/?apikey=' + key + '&t=' + title + '&plot=short&r=json';
  let omdbInfo = axios.get(URL).then((result) => {
    return result;
  });
  return omdbInfo;
};

const moviePromises = grabTitles();
const titleList = getMovieList(moviePromises);
const movieList = addOMDBInfo(titleList);
