import React, { Component } from 'react';
import GenreCollection from './GenreCollection';
import MediaCollection from './MediaCollection';
import Main from './Main';
import './Header.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class Header extends Component {
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
  };

  grabGenre = (e) => {
    if (e.target.innerHTML === "Movie") {
      this.setState({ contentType: e.target.innerHTML})
    } else if (e.target.innerHTML === "Show") {
      this.setState({ contentType: e.target.innerHTML})
    }
    this.setState({ selectedGenre: "" })
  };

  clearInfo = () => {
    this.setState({ contentType: "", selectedGenre: "" })
  };

  render() {
    return (
      <Router>
        <main>
          <nav className="navbar-fixed-top fixed-header">
            <div className="category">
              <span><strong>Type: </strong>{this.state.contentType}</span>
              <span><strong>Genre: </strong>{this.state.selectedGenre}</span>
            </div>
            <h1>Pick-A-Flick</h1>
            <div className="links">
              <Link id="header-btn" className="btn btn-outline-primary" onClick={this.grabGenre} to="/movie/genres">Movie</Link>
              <Link id="header-btn" className="btn btn-outline-primary" onClick={this.grabGenre} to="/show/genres">Show</Link>
              <Link id="header-btn" className="btn btn-outline-primary" onClick={this.clearInfo} to="/">About</Link>
            </div>

          </nav>

          <section>
            <Route
              exact path="/"
              component={ Main }
            />

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
    );
  }
}


export default Header;
