import React, { Component } from 'react';
import Home from './components/Home.js';
// import GenreCollection from './components/GenreCollection.js';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     contentType: ""
  //   }
  // }
  //
  // showGenres = (e) => {
  //   if (e.target.innerHTML === "Movie") {
  //     this.setState({ contentType: e.target.innerHTML})
  //   } else if (e.target.innerHTML === "Show") {
  //     this.setState({ contentType: e.target.innerHTML})
  //   }
  // }

  render() {
    return (
      <Router>
        <main>
          <h1>PickFlix</h1>
        

          <Route
            exact path="/"
            render={() => <Home />}
          />
        </main>
      </Router>
    );
  }
}

export default App;
