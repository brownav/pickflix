import React, { Component } from 'react';
import axios from 'axios';
import Genre from './Genre.js'
import './GenreCollection.css';
import PropTypes from 'prop-types';

class GenreCollection extends Component {
  constructor(props) {
    super(props)

    this.state = { genres: [] }
  }

  grabURL = () => {
    if (this.props.contentType === "Movie") {
      let temp = "http://localhost:4000/api/movies/genres";
      return temp
    } else if (this.props.contentType === "Show") {
      let temp = "http://localhost:4000/api/shows/genres";
      return temp
    }
  }

  componentDidMount = () => {
    const URL = this.grabURL();
    axios.get(URL)
    .then((response) => {
      const data = response.data.sort();
      this.setState({ genres: data })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  renderGenres = () => {
    let genreList = this.state.genres.map((genre, index) => {
      return (
        <Genre
          key={index}
          name={genre}
          contentType={this.props.contentType}
          selectedGenreCallback={this.props.selectedGenreCallback}
        />
      );
    });
    return genreList
  }

  render () {
    return (
      <div className="row list-container">
        {this.renderGenres()}
      </div>
    );
  }
}

GenreCollection.propTypes = {
  contentType: PropTypes.string,
  selectedGenreCallback: PropTypes.func
}

export default GenreCollection;
