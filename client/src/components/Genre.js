import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Genre.css';
import _ from 'lodash';

class Genre extends Component {
  selectedGenreCallback = () => {
    this.props.selectedGenreCallback(this.props.name);
  };

  displayImage = () => {
    let genreImages = {
      "Action": "https://nofilmschool.com/sites/default/files/styles/article_wide/public/enter_the_dragon.jpg?itok=Gl98cq3X",
      "Adventure": "http://dreamstop.com/wp-content/uploads/2012/10/Adventure-Dreams.jpg",
      "Animation": "http://giant.ie/animation/wp-content/uploads/2014/04/09_The-Artists-promotional-image-3-600x403.jpg",
      "Biography": "https://www.thefamouspeople.com/profiles/images/louis-armstrong-2.jpg",
      "Comedy": "https://metrouk2.files.wordpress.com/2012/11/article-1353163906711-1613ae8c000005dc-397549_466x310.jpg",
      "Crime": "https://cdn20.patchcdn.com/users/22906546/20180328/043922/styles/T800x600/public/processed_images/handcuffs-1522267649-6528.jpg",
      "Documentary": "https://i1.wp.com/vloggergear.com/wp-content/uploads/2017/12/ice-documentary.jpg",
      "Horror": "https://www.youlinmagazine.com/articles/drama-dar-si-jati-hai-sila-review.jpg",
      "Drama": "https://www.wallpaperup.com/uploads/wallpapers/2015/09/18/805969/2331cf32bb0d8725c4220fb4bea9eb33-700.jpg",
      "Fantasy": "https://pbs.twimg.com/media/CK4Em0BWsAA8iMD.jpg",
      "Family": "http://photoartinc.com/wp-content/uploads/2018/02/family-stock-photos-1.jpg",
      "History": "http://russian7.ru/wp-content/uploads/2017/12/LMki9ecO.jpeg",
      "Mystery": "http://4.bp.blogspot.com/-eCLo030zXz4/VoXHt7lwPFI/AAAAAAAAEk4/3gXQxa4Q7KA/s1600/sherlock.jpg",
      "Game-Show": "http://tvimpulse.com/images/The-100000-Pyramid-660x375.jpg",
      "Music": "https://static.reverb.com/assets/homepage/open-graph-0011ab9305a10fa218e299644855af8d.jpg",
      "Musical": "https://bollywoodeventcompany.co.uk/dancers/images/dancers_bollywood.jpg",
      "Reality-TV": "https://ewedit.files.wordpress.com/2016/11/prs15_070816_bn-0327.jpg?w=700",
      "Romance": "http://www.eatout.co.za/wp-content/uploads/2016/02/Romantic-dinner-for-two.jpg",
      "Thriller": "https://www.filmykeeday.com/wp-content/uploads/2014/03/Phone-Booth-mystery-thriller-movie-e1484810336661.jpg",
      "Sci-Fi": "https://sharathkomarrajudotcom.files.wordpress.com/2014/06/science_fiction.jpg",
      "Short": "https://5.imimg.com/data5/WP/QX/MY-2451704/stop-watch-500x500.jpg",
      "War": "https://i.pinimg.com/originals/90/d3/65/90d365cfb302be19b3bf149805ff5afa.jpg",
      "Sport": "https://usatftw.files.wordpress.com/2015/05/usp_boxing__mayweather_vs_pacquiao_72813420.jpg",
      "Western": "http://most-wanted-western-movies.com/wp-content/uploads/2011/12/rsz_western_movie_once_upon_a_time_in_west_leone.jpg",
      "Talk-Show": "http://www.broadcastdesign.com/wp/wp-content/uploads/2012/08/multimedios_talk_03.jpg",
      "News": "https://www.eschoolnews.com/files/2016/02/news-600x400.jpg"
    }
    let image = _.get(genreImages, [this.props.name]);
    return image ? image : "https://cdn.shopify.com/s/files/1/1465/2246/products/blank.jpg";
  };

  createURL = () => {
    const name = this.props.name.toLowerCase();
    let contentType = this.props.contentType.toLowerCase();
    return "/" + contentType + "/" + name;
  };

  render() {
    return (
      <Link className="card" to={this.createURL()} onClick={this.selectedGenreCallback}>
        <p id="card-title">{this.props.name}</p>
        <img className="card-img-top" src={this.displayImage()} alt="genre icon"/>
      </Link>
    );
  }
}

Genre.propTypes  ={
  name: PropTypes.string,
  contentType: PropTypes.string,
  selectedGenreCallback: PropTypes.func
}

export default Genre;
