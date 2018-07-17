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
      <article className="grid-container">

        <div className="title">
          <h3>{this.props.title}</h3>
        </div>


        <div className="image">
          <img src={this.props.image} alt="movie poster" height="250" width="200"/>
        </div>

          <div className="col-one">
            <p><strong>Rated:</strong> {this.props.rated}</p>
            <p><strong>Runtime:</strong> {this.props.runtime}</p>
            <p><strong>Director:</strong> {this.props.director}</p>
            <p><strong>Actors:</strong> {this.props.actors}</p>
          </div>

          <div className="col-two">
            <p><strong>Average Score:</strong> {this.props.avgRating}</p>
            <p><strong>Runtime:</strong> {this.props.runtime}</p>
            {this.showEpisodeCount()}
            <p><strong>Released:</strong> {this.props.released}</p>
            <p><strong>Awards:</strong> {this.props.awards}</p>
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
}

export default Media;
