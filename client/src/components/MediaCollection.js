import React, { Component } from 'react';
import axios from 'axios'
import Media from './Media.js'
import './MediaCollection.css'

const URL = "http://localhost:4000/api/movies"

class MediaCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: []
    }
  }

  componentDidMount = () => {
    axios.get(URL)
    .then((response) => {
      console.log(response.data);
      this.setState({
        media: response.data
      })
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

export default MediaCollection;
