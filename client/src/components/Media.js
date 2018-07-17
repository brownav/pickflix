import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Media.css';

class Media extends Component {

  showEpisodeCount = () => {
    if (this.props.contentType === 'series') {
      return <p><strong>Episodes:</strong> {this.props.episodeCount}</p>
    }
  }

  render() {

    return (
      <article className="media-container">
        <h3>{this.props.title}</h3>
        <p><strong>Rated:</strong> {this.props.rated}</p>
        <p><strong>Runtime:</strong> {this.props.runtime}</p>
        <p><strong>Director:</strong> {this.props.director}</p>
        <p><strong>Actors:</strong> {this.props.actors}</p>
        <p><strong>Runtime:</strong> {this.props.runtime}</p>
        <p><strong>Average Score:</strong> {this.props.avgRating}</p>

        {this.showEpisodeCount()}
        <img className="image" src={this.props.image} alt="movie poster" height="200" width="150"/>

        <p><strong>Released:</strong> {this.props.released}</p>
        <p><strong>Awards:</strong> {this.props.awards}</p>


        <p><strong>Plot:</strong> {this.props.plot}</p>

      </article>
    );
  }
}

Media.propTypes = {
  title: PropTypes.string.isRequired,
  rated: PropTypes.string,
  runtime: PropTypes.string,
  director: PropTypes.string,
  actors: PropTypes.array,
  avgRating: PropTypes.number,
  episodeCount: PropTypes.number,
  image: PropTypes.string,
  contentType: PropTypes.string,
  released: PropTypes.string,
  awards: PropTypes.string,
  plot: PropTypes.string,
}

export default Media;
