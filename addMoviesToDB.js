const movies = require('./grabOMDB.js')

const timer = setTimeout(function(){createCollection(movies)}, 30000);


const createCollection = (movies) => {
  console.log('in add movies to db...');
  console.log(movies[0]);
}




timer;
