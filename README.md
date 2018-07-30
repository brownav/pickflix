[Pick-A-Flick](https://pickaflick.herokuapp.com)

## Description:
Responsive web app which organizes Netflix content by genre and aggregate score based on available IMDB, Rotten Tomatoes, and Metacritic scores. 

## Data:
Netflix and IMDB do not have publically available APIs; data sources include titles scrapped from Reelgood.com and information gathered from the OMDB API.

## Run Code:
1. Repopulate the database - node ./grabMovieInfo.js
2. Run servers - npm run dev

## Layout:
Backend files are in root directory, and client folder stores front end. 

## Tech Stack:
1. MongoDB (hosted on mLab)
2. Express 
3. React.js
4. Node.js
