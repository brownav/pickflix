import React, { Component } from 'react';
import axios from 'axios';
import Genre from './Genre.js'
import './GenreCollection.css';

const URL = "http://localhost:4000/api/movies/genres";

class GenreCollection extends Component {
  constructor(props) {
    super(props)

    this.state = { genres: [] }
  }

  componentDidMount = () => {
    axios.get(URL)
    .then((response) => {
      this.setState({ genres: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderGenres = () => {
    const genreList = this.state.genres.map((genre, index) => {
      return (
        <Genre
          key={index}
          name={genre}
        />
      );
    });
    return genreList
  }

  render () {
    return (
      <div className="genre-list">
        {this.renderGenres()}
      </div>
    );
  }
}

export default GenreCollection;
