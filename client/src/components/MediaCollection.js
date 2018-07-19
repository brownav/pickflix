import React, { Component } from 'react';
import axios from 'axios'
import Media from './Media.js'
import './MediaCollection.css'
import PropTypes from 'prop-types';

class MediaCollection extends Component {
  constructor(props) {
    super(props);

    this.sideBlock = React.createRef();
    this.mainBlock = React.createRef();
    this.collection = React.createRef();

    this.state = {
      media: []
    }
  }

  grabURL = () => {
    let urlGenre = this.props.genre.toLowerCase();
    console.log(this.props.contentType);
    console.log(urlGenre);
    if (this.props.contentType === "Movie") {
      let temp = "http://localhost:4000/api/movies/" + urlGenre
      return temp;
    } else if (this.props.contentType === "Show") {
      let temp = "http://localhost:4000/api/shows/" + urlGenre
      return temp;
    }
  };


  componentDidMount = () => {
    if (this.props.genre) {
      const URL = this.grabURL();
      console.log(URL);
      axios.get(URL)
      .then((response) => {
        this.setState({ media: response.data });
        console.log(this.state.media[0].ratings[0].Value);
      })
      .catch((error) => {
        console.log(error);
      })
    }
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

  openNav = () => {
    const side = this.sideBlock.current;
    side.style.width = "250px";
    const main = this.mainBlock.current;
    main.style.marginLeft = "-150px";
    main.style.marginRight = "100px";

  }

  closeNav = () => {
    const side = this.sideBlock.current;
    side.style.width = "0";
    const main = this.mainBlock.current;
    main.style.marginRight = "0";
    main.style.marginLeft = "0";
  }

  render() {

    return (
      <section>
        <div id="mySidenav" className="sidenav" ref={this.sideBlock}>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
          <p>test</p>
        </div>


        <div id="main" ref={this.mainBlock}>
          <div className="media-collection" ref={this.collection}>
            <span onClick={this.openNav}>open</span>
            {this.renderMediaList()}
          </div>
        </div>
      </section>
    );
  }
}

MediaCollection.propTypes = {
  genre: PropTypes.string,
  contentType: PropTypes.string
}

export default MediaCollection;
