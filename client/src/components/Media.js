import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Media.css';

class Media extends Component {

  showEpisodeCount = () => {
    if (this.props.contentType === 'series') {
      return <p><strong>Episodes:</strong> {this.props.episodeCount}</p>
    }
  }

  selectedTitleCallback = () => {
    this.props.selectedTitleCallback(this.props.title, this.props.image);
  }

  render() {
    return (
      <article className="grid-container">

        <div className="title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="image">
          <img src={this.props.image} alt="movie poster" height="220" width="150"/>
        </div>
        <div className="col-one">
          <p><strong>Rated:</strong> {this.props.rated}</p>
          <p><strong>Runtime:</strong> {this.props.runtime}</p>
          <p><strong>Director:</strong> {this.props.director}</p>
          <p><strong>Actors:</strong> {this.props.actors}</p>
        </div>

        <div className="col-two">
          <p><strong>Average Score:</strong> {this.props.avgRating}</p>
          {this.showEpisodeCount()}
          <p><strong>Released:</strong> {this.props.released}</p>
          <p><strong>Awards:</strong> {this.props.awards}</p>
          <button onClick={this.selectedTitleCallback} type="button" className="btn btn-outline-dark btn-sm">Select</button>
        </div>
        <div className="plot">
          <p><strong>Plot:</strong> {this.props.plot}</p>
        </div>
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
  selectedTitleCallback: PropTypes.func
}

export default Media;
