import React, { Component } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class App extends Component {


  render() {
    return(
        <main>
          <Header />
          <footer></footer>
        </main>
    )
  }
}

export default App;
