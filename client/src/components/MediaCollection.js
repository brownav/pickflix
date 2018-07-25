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
      selectedMovies: [],
      winner: "",
    }
  }

  grabURL = () => {
    let urlGenre = this.props.genre.toLowerCase();
    if (this.props.contentType === "Movie") {
      let temp = "/api/movies/" + urlGenre
      return temp
    } else if (this.props.contentType === "Show") {
      let temp = "/api/shows/" + urlGenre
      return temp
    }
  };

  componentDidMount = () => {
    if (this.props.genre) {
      const URL = this.grabURL();
      axios.get(URL)
      .then((response) => {
        this.setState({ media: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  };

  setSelectedTitle = (movie) => {
    let values = [];
    Object.values(this.state.selectedMovies).forEach(function(value) {
      values.push(value.title);
    })
    if (!values.includes(movie.title) && this.state.winner === "" && this.state.selectedMovies.length < 5) {
      this.setState({
        selectedMovies: [...this.state.selectedMovies, movie]});
    }
    this.openNav();
  };

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

  renderSelectedMovies = () => {
    return this.state.selectedMovies.map((movie, i) => {
      return (
        <p className="list" key={`selected-title-${i}`}>{i + 1}. <strong>{movie.title}</strong> ({movie.rating})</p>
      );
    });
  }

  openNav = () => {
    this.setState({navOpen: true});
  }

  closeNav = () => {
    this.setState({navOpen: false});
    this.setState({
      selectedMovies: [],
      winner: ""
    });
  }

  tieBreaker = () => {
    let winner = _.sample(this.state.selectedMovies);
    this.setState({
      selectedMovies: [],
      winner: ""
    })
    this.showWinner(winner);
  };

  showWinner = (winner) => {
    if (winner) {
      this.setState({ winner: winner });
    }
  };

  renderButton = () => {
    if (this.state.selectedMovies.length >= 2) {
      return <button onClick={this.tieBreaker} id="submit-btn" className="btn btn-outline-dark btn-sm">Submit</button>
    }
  };

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
        width: "17em"
      };

      mainStyle = {
        marginRight: "8em",
        marginLeft: "-6em"
      }
    }

    const winner = this.state.winner ? <div id="winner-container"><h5>{this.state.winner.title}   ({this.state.winner.rating})</h5><img src={this.state.winner.image}className="winner-img" alt="movie poster" height="275" width="200"/></div> : null;

    return (
      <section>
        <div id="mySidenav" className="sidenav" style={sideNavStyle}>
          <span><h4>-Pick For Me-</h4></span>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
          {winner}
          {this.renderSelectedMovies()}
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
