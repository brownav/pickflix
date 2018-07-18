import React, { Component } from 'react';
import GenreCollection from './components/GenreCollection.js';
import MediaCollection from './components/MediaCollection';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contentType: "",
      selectedGenre: "",
    }
  }

  setSelectedGenre = (genre) => {
    this.setState({
      selectedGenre: genre,
    })
  }

  grabGenre = (e) => {
    if (e.target.innerHTML === "Movie") {
      this.setState({ contentType: e.target.innerHTML})
    } else if (e.target.innerHTML === "Show") {
      this.setState({ contentType: e.target.innerHTML})
    }
  }

  render() {
    return(
      <Router>
        <main>
            <header>
              <h1>Pick-A-Flick</h1>
              <section className="category-container">
                <Link type="button" className="btn btn-outline-primary" onClick={this.grabGenre} to="/movie/genres">Movie</Link>
                <Link type="button" className="btn btn-outline-primary" onClick={this.grabGenre} to="/show/genres">Show</Link>
              </section>
            </header>

          <section>
            <Route
              path="/movie/genres"
              render={(props) => <GenreCollection {...props} contentType={this.state.contentType} selectedGenreCallback={this.setSelectedGenre} />}
            />

            <Route
              path="/show/genres"
              render={(props) => <GenreCollection {...props} contentType={this.state.contentType} selectedGenreCallback={this.setSelectedGenre} />}
            />

            <Route
              exact path={"/movie/" + this.state.selectedGenre}
              render={(props) => <MediaCollection {...props} contentType={this.state.contentType} genre={this.state.selectedGenre} />}

            />

            <Route
              exact path={"/show/" + this.state.selectedGenre}
              render={(props) => <MediaCollection {...props} contentType={this.state.contentType} genre={this.state.selectedGenre} />}
            />
          </section>
        </main>
      </Router>
    )
  }
}

export default App;
