import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div id="main-container">
        <section className="intro">
          <h2>About</h2>
          <h5>For the Netflix user who doesnt know what they want, this site sorts Netflix titles by genre based on an aggregated average score.</h5>
        </section>

        <h3>Layout</h3>
        <ol>
          <li>Select movie or show</li>
          <li>Select a genre</li>
          <li>Browse content ordered by average rating (orange number with dropdown scores)</li>
        </ol>

        <p><h3>Pick for Me</h3> For help deciding between multiple titles, there is a tiebreaker feature which randomly chooses one for you. Select 2-5 titles of interest and click submit. The same title may not be added more than once, nor more than 5 titles. If you wish to remove a title before submitting, click on the title.</p>

        <p><h3>Process</h3> Netflix titles are grabbed from <a href="https://reelgood.com/source/netflix">Reelgood.com</a> and paired with <a href="http://www.omdbapi.com/">OMDB API</a> data to provide available IMDB, Rotten Tomatoes, and Metacritic ratings. These ratings are averaged, and all titles are organized by content type (movie or show) and genre. Titles are displayed in order of their average ranking from highest to lowest.</p>

        <p><h3>Disclaimer</h3>Netflix and IMDB do not have publically available APIs. Some Netflix titles may be missing i.e. foreign films, titles not on OMDB, and the newest releases. The database does not automatically update as of yet, and information on OMDB may be incorrect as it is user populated.</p>
      </div>
    );
  }
}

export default Main;
