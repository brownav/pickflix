import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div id="main-container">
        <section className="intro">
          <h2>About</h2>
          <h5>Pick-A-Flick helps Netflix users find and select content more objectively and efficiently. Netflix titles are sorted from top to bottom using an aggregated average score.</h5>
        </section>
        <p><h3>Process</h3> Netflix titles are grabbed from <a href="https://reelgood.com/source/netflix">Reelgood.com</a> and paired with <a href="http://www.omdbapi.com/">OMDB API</a> data to provide available IMDB, Rotten Tomatoes, and Metacritic ratings. These ratings are averaged, and all titles are organized by content type (movie or show) and genre. Titles are then displayed in order of their average ranking from highest to lowest. Each content page also has a `Pick for Me` feature which randomly selects a title based on up to 5 selected titles.</p>

        <h3>Layout</h3>
        <ol>
          <li>Select movie or show</li>
          <li>Select a genre</li>
          <li>Browse content ordered by average rating (orange score with dropdown breakdowns)</li>
        </ol>

        <p><h3>Pick for Me</h3> For help deciding between multiple titles, there is a tiebreaker feature which randomly chooses one for you. Once you are on a page with listed titles, select 2-5 of interest and click submit.</p>

        <p><h3>Pitfalls</h3></p>

      </div>
    )
  }
}

export default Main;
