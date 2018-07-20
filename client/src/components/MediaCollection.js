import React, { Component } from 'react';
import axios from 'axios'
import Media from './Media.js'
import './MediaCollection.css'
import PropTypes from 'prop-types';
import _ from 'lodash';


class MediaCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: [],
      navOpen: false,
      selectedTitles: [],
      winner: "",
      selectedImages: []
    }
  }

  grabURL = () => {
    let urlGenre = this.props.genre.toLowerCase();
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

  setSelectedTitle = (title, image) => {
    if (!this.state.selectedTitles.includes(title) && this.state.selectedTitles.length < 5) {
      this.setState({ selectedTitles: [...this.state.selectedTitles, title]});
    }
    this.setState({ selectedImages: [...this.state.selectedImages, image]});
    this.openNav();
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
          selectedTitleCallback={this.setSelectedTitle}
        />
      );
    });
    return mediaList
  }

  renderSelectedTitles = () => {
    return this.state.selectedTitles.map((title, i) => {
      return (
        <p className="list" key={`selected-title-${i}`}>{i + 1}. {title}</p>
      );
    });
  }

  openNav = () => {
    this.setState({navOpen: true});
  }

  closeNav = () => {
    this.setState({navOpen: false});
    this.setState({ selectedTitles: [], winner: "", image: "", selectedImages: [] })
  }

  tieBreaker = () => {
    let winner = _.sample(this.state.selectedTitles);
    let imageIndex = this.state.selectedTitles.indexOf(winner);
    let image = this.state.selectedImages[imageIndex];

    this.setState({ selectedTitles: [], winner: "" });
    this.showWinner(winner, image);
  }

  showWinner = (winner, image) => {
    if (winner) {
      this.setState({ winner: winner, image: image })
    }
  }

  renderButton = () => {
    if (this.state.selectedTitles.length >= 2) {
      return <button onClick={this.tieBreaker} type="button" id="submit-btn" className="btn btn-outline-dark btn-sm">Submit</button>
    }
  }

  render() {
    let sideNavStyle = {
      width: "0"
    };
    let mainStyle = {
      marginRight: "0",
      marginLeft: "0"
    };

    if (this.state.navOpen) {
      sideNavStyle = {
        width: "15em"
      };

      mainStyle = {
        marginRight: "8em",
        marginLeft: "-6em"
      }
    }

    const winner = this.state.winner ? <div id="winner-container"><h5>{this.state.winner}</h5><img src={this.state.image} className="winner-img" alt="movie poster" height="220" width="150"/></div> : null;

    return (
      <section>
        <div id="mySidenav" className="sidenav" style={sideNavStyle}>
          <span><h4>Tiebreaker</h4></span>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
          {winner}
          {this.renderSelectedTitles()}
          {this.renderButton()}
        </div>

        <div id="main" style={mainStyle}>
          <div className="media-collection">
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
