import React, { Component } from 'react';
import GenreCollection from './components/GenreCollection.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contentType: ""
    }
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
          <header className="row">
            <h1>PickFlix</h1>
            <section className="category-container">
              <Link type="button" className="btn btn-primary" onClick={this.grabGenre} to="/movie/genres">Movie</Link>
              <Link type="button" className="btn btn-primary" onClick={this.grabGenre} to="/show/genres">Show</Link>
            </section>
          </header>

          <section>
            <Route
              path="/movie/genres"
              render={(props) => <GenreCollection {...props} contentType={this.state.contentType} />}
            />

            <Route
              path="/show/genres"
              render={(props) => <GenreCollection {...props} contentType={this.state.contentType} />}
            />
          </section>
        </main>
      </Router>
    )
  }
}

export default App;
