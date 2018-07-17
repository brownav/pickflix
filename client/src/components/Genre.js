import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaCollection from './MediaCollection.js';


class Genre extends Component {

  selectedGenreCallback = () => {
    this.props.selectedGenreCallback(this.props.name);
  }

  render() {
    return (
      <div>
        <p onClick={this.selectedGenreCallback}>{this.props.name}</p>
      </div>
    )
  }
}

Genre.propTypes  ={
  name: PropTypes.string,
  contentType: PropTypes.string,
  selectedGenreCallback: PropTypes.func
}

export default Genre;
