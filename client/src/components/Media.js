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
      return <p><strong>Episodes:</strong> {this.props.episodeCount}</p>
    }
  }

  selectedTitleCallback = () => {
    const movie = {title: this.props.title, rating: this.props.avgRating, image: this.props.image}
    this.props.selectedTitleCallback(movie);
  }
  // <p><strong>Actors:</strong> {this.props.actors}</p>

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
  }

  render() {
    return (
      <article className="grid-container">

        <div className="title">
          <h3>{this.props.title}</h3>

          <div className="btn-group">
            <p id="drp-down" className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.avgRating}</p>
            <div className="dropdown-menu">
              {this.showRatings()}
            </div>
          </div>

        </div>


        <div className="image">
          <img src={this.props.image} alt="movie poster" height="220" width="150"/>
        </div>
        <div className="col-one">
          <p><strong>Rated:</strong> {this.props.rated}</p>
          <p><strong>Runtime:</strong> {this.props.runtime}</p>
          <p><strong>Director:</strong> {this.props.director}</p>
        </div>

        <div className="col-two">
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
