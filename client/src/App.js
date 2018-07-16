import React, { Component } from 'react';
import Home from './components/Home.js';
// import GenreCollection from './components/GenreCollection.js';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom';

class App extends Component {
  render() {
    return (

        <main>
          <h1>PickFlix</h1>
          <Home />

        </main>

    );
  }
}

export default App;
