import React, { Component } from 'react';
import MediaCollection from './components/MediaCollection.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
        <h1>PickFlix</h1>
        <MediaCollection />
      </main>
    );
  }
}

export default App;
