import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Media.css';

class Media extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ratings: this.props.ratings
    }
  }

  showEpisodeCount = () => {
    if (this.props.contentType === 'series') {
      return <span><strong>Episodes:</strong> {this.props.episodeCount}</span>
    }
  };

  selectedTitleCallback = () => {
    const movie = {title: this.props.title, rating: this.props.avgRating, image: this.props.image}
    this.props.selectedTitleCallback(movie);
  };

  showRatings = () => {
    const ratings = this.state.ratings.map((rating, i) => {
      if (rating.Source === 'Internet Movie Database') {
        rating.Source = 'IMDB'
      }
      return (
        <p key={`rating-${i}`}>{rating.Source}: {rating.Value}</p>
      )
    })
    return ratings;
  };

  showImage = () => {
    if (this.props.image === "N/A") {
      return "https://png.clipart.me/previews/90c/movie-poster-background-vector-material-17011.jpg"
    } else { return this.props.image }
  };


  render() {
    const avgRating = this.props.avgRating ? this.props.avgRating : "N/A";

    return (
      <article className="grid-container">
        <div className="media-title">
          <h3>{this.props.title}</h3>
          <div className="btn-group">
            <button id="media-btn" onClick={this.selectedTitleCallback} className="btn btn-outline-dark btn-sm">Select</button>
            <p id="drp-down" className="btn btn-outline-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{avgRating}</p>
            <div className="dropdown-menu">
              {this.showRatings()}
            </div>
          </div>
        </div>

        <div className="image">
          <img id="image" src={this.showImage()} alt="movie poster" height="220" width="150"/>
        </div>

        <div className="col-one">
          <span><strong>Rated:</strong> {this.props.rated}</span>
          <span><strong>Runtime:</strong> {this.props.runtime}</span>
          <span><strong>Director:</strong> {this.props.director}</span>
        </div>

        <div className="col-two">
          {this.showEpisodeCount()}
          <span><strong>Released:</strong> {this.props.released}</span>
          <span><strong>Awards:</strong> {this.props.awards}</span>
        </div>

        <div className="plot">
          <span><strong>Plot:</strong> {this.props.plot}</span>
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
  selectedTitleCallback: PropTypes.func,
  ratings: PropTypes.object
}

export default Media;
