import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Genre extends Component {

  selectedGenreCallback = () => {
    this.props.selectedGenreCallback(this.props.name);
  }

  createURL = () => {
    const name = this.props.name.toLowerCase();
    if (this.props.contentType === "Movie") {
      const media = this.props.contentType.toLowerCase();
      return "/" + media + "/" + name
    } else if (this.props.contentType === "Show") {
      const media = this.props.contentType.toLowerCase();
      return "/" + media + "/" + name
    }
  }

  render() {
    return (
      <div>
        <Link to={this.createURL()} onClick={this.selectedGenreCallback}>{this.props.name}</Link>
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
