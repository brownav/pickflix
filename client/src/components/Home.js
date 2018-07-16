import React, { Component } from 'react';
import GenreCollection from './GenreCollection.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      contentType: ""
    }
  }

  showGenres = (e) => {
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
          <section className="category-buttons">
            <Link className="button" onClick={this.showGenres} to="/movie/genres">Movie</Link>
            <Link className="button" onClick={this.showGenres} to="/show/genres">Show</Link>
          </section>

          <section>
            <Route
              path="/movie/genres"
              render={() => <GenreCollection contentType={this.state.contentType} />}
            />

            <Route
              path="/show/genres"
              render={() => <GenreCollection contentType={this.state.contentType} />}
            />
          </section>
        </main>
      </Router>
    )
  }
}

export default Home;
