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
    let contentType = this.props.contentType.toLowerCase();
    return "/api/" + contentType + "s/" + urlGenre;
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
      const rating = movie.rating ? movie.rating : "N/A"
      return (
        <p className="list" key={`selected-title-${i}`}>{i + 1}. <strong>{movie.title}</strong> ({rating})</p>
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
      if (!winner.rating) {
        winner.rating = "N/A"
      }
      if (winner.image === "N/A") {
        winner.image = "https://png.clipart.me/previews/90c/movie-poster-background-vector-material-17011.jpg"
      }
      this.setState({ winner: winner });
    }
  };

  renderButton = () => {
    if (this.state.selectedMovies.length >= 2) {
      return <button onClick={this.tieBreaker} id="submit-btn" className="btn btn-outline-dark btn-sm">Submit</button>
    }
  };

  removeMovie = (e) => {
    if (e.target.innerHTML === "Submit") {
      this.tieBreaker();
    } else if (e.target.innerHTML === "x") {
      this.closeNav();
    } else {
      let title = e.target.textContent;
      const newList = _.filter(this.state.selectedMovies, movie => movie.title !== title);

      this.setState({
        selectedMovies: newList
      })
    }
  }

  sidebarOpen = () => {
    if (this.state.navOpen) {
      return "sidebar-open sidenav"
    } else {
      return "sidebar-closed sidenav"
    }
  }

  render() {
    let sideNavStyle = {
      width: "0",
      right: "0"
    };
    let mainStyle = {
      marginRight: "0",
      marginLeft: "0"
    };

    if (this.state.navOpen) {
      sideNavStyle = {
        width: "18em"
      };

      mainStyle = {
        marginRight: "8em",
        marginLeft: "-8em"
      }
    }


    const winner = this.state.winner ? <div id="winner-container"><h5>{this.state.winner.title} ({this.state.winner.rating})</h5><img src={this.state.winner.image}className="winner-img" alt="movie poster" height="275" width="225"/></div> : null;

    return (
      <section>
        <div className={this.sidebarOpen()} style={sideNavStyle} onClick={this.removeMovie}>
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
