import React, { Component } from 'react';
import axios from 'axios'
import Media from './Media.js'
import './MediaCollection.css'
import PropTypes from 'prop-types';

class MediaCollection extends Component {
  constructor(props) {
    super(props);

    this.state = { media: [] }
  }

  grabURL = () => {
    // console.log(this.props);
    // console.log(this.props.genre);
    let urlGenre = this.props.genre.toLowerCase();
    if (this.props.contentType === "Movie" && this.props.genre !== "") {
      let temp = "http://localhost:4000/api/movies/" + urlGenre
      return temp;
    } else if (this.props.contentType === "Show" && this.props.genre !== "") {
      let temp = "http://localhost:4000/api/shows/" + urlGenre
      return temp;
    }
  }

  componentDidMount = () => {
    const URL = this.grabURL;
    console.log(URL);
    axios.get(URL)
    .then((response) => {
      this.setState({ media: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  renderMediaList = () => {
    const mediaList = this.state.media.map((media) => {
      return (
        <Media
          key={media._id}
          title={media.title}
          contentType={media.contentType}
          rated={media.rated}
          released={media.released}
          plot={media.plot}
          awards={media.awards}
          image={media.image}
          avgRating={media.avgRating}
          director={media.director}
          runtime={media.runtime}
          genres={media.genres}
          ratings={media.ratings}
          actors={media.actors}
          episodeCount={media.episodeCount}
        />
      );
    });
    return mediaList
  }

  render() {
    return (
      <div className="media-collection">
      {this.renderMediaList()}
      </div>
    );
  }
}

MediaCollection.propTypes = {
  genre: PropTypes.string,
  contentType: PropTypes.string
}

export default MediaCollection;
