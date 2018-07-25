import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Genre.css';

class Genre extends Component {
  selectedGenreCallback = () => {
    this.props.selectedGenreCallback(this.props.name);
  };

  displayImage = () => {
    switch(this.props.name) {
      case 'Action':
        return "https://nofilmschool.com/sites/default/files/styles/article_wide/public/enter_the_dragon.jpg?itok=Gl98cq3X";
      case 'Adventure':
        return "http://dreamstop.com/wp-content/uploads/2012/10/Adventure-Dreams.jpg";
      case 'Animation':
        return "http://giant.ie/animation/wp-content/uploads/2014/04/09_The-Artists-promotional-image-3-600x403.jpg";
      case 'Biography':
        return "https://www.thefamouspeople.com/profiles/images/louis-armstrong-2.jpg";
      case 'Comedy':
        return "https://metrouk2.files.wordpress.com/2012/11/article-1353163906711-1613ae8c000005dc-397549_466x310.jpg";
      case 'Crime':
        return "https://cdn20.patchcdn.com/users/22906546/20180328/043922/styles/T800x600/public/processed_images/handcuffs-1522267649-6528.jpg";
      case 'Documentary':
        return "https://i1.wp.com/vloggergear.com/wp-content/uploads/2017/12/ice-documentary.jpg";
      case 'Horror':
        return "https://www.youlinmagazine.com/articles/drama-dar-si-jati-hai-sila-review.jpg";
      case "Drama":
        return "https://www.wallpaperup.com/uploads/wallpapers/2015/09/18/805969/2331cf32bb0d8725c4220fb4bea9eb33-700.jpg";
      case "Fantasy":
        return "https://pbs.twimg.com/media/CK4Em0BWsAA8iMD.jpg";
      case "Family":
        return "http://www.mdpoison.com/media/SOP/mdpoisoncom/sebin/d/s/family.jpg";
      case 'History':
        return "http://russian7.ru/wp-content/uploads/2017/12/LMki9ecO.jpeg";
      case "Mystery":
        return "http://www.sgi-privateinvestigator.co.uk/wp-content/uploads/2013/11/iStock_000004270160XSmall1.jpg";
      case "Game-Show":
        return "http://tvimpulse.com/images/The-100000-Pyramid-660x375.jpg";
      case "Music":
        return "https://static.reverb.com/assets/homepage/open-graph-0011ab9305a10fa218e299644855af8d.jpg";
      case "Musical":
        return "http://news.spicepay.com/wp-content/uploads/2017/08/bollywood.jpg";
      case "Reality-TV":
        return "https://ewedit.files.wordpress.com/2016/11/prs15_070816_bn-0327.jpg?w=700";
      case "Romance":
        return "https://d3m3tdr3wo3gly.cloudfront.net/wp-content/uploads/2018/04/23211751/Popular-Books-on-Contemporary-Romance.jpg";
      case "Thriller":
        return "https://www.filmykeeday.com/wp-content/uploads/2014/03/Phone-Booth-mystery-thriller-movie-e1484810336661.jpg";
      case "Sci-Fi":
        return "https://sharathkomarrajudotcom.files.wordpress.com/2014/06/science_fiction.jpg";
      case "Short":
        return "https://5.imimg.com/data5/WP/QX/MY-2451704/stop-watch-500x500.jpg";
      case "War":
        return "https://i.pinimg.com/originals/90/d3/65/90d365cfb302be19b3bf149805ff5afa.jpg";
      case "Sport":
        return "https://usatftw.files.wordpress.com/2015/05/usp_boxing__mayweather_vs_pacquiao_72813420.jpg";
      case "Western":
        return "http://most-wanted-western-movies.com/wp-content/uploads/2011/12/rsz_western_movie_once_upon_a_time_in_west_leone.jpg";
      case "Talk-Show":
        return "http://www.broadcastdesign.com/wp/wp-content/uploads/2012/08/multimedios_talk_03.jpg";
      case "News":
        return "https://www.eschoolnews.com/files/2016/02/news-600x400.jpg";
      default:
        return "https://cdn.shopify.com/s/files/1/1465/2246/products/blank.jpg";
    }
  };

  createURL = () => {
    const name = this.props.name.toLowerCase();
    if (this.props.contentType === "Movie") {
      const media = this.props.contentType.toLowerCase();
      return "/" + media + "/" + name
    } else if (this.props.contentType === "Show") {
      const media = this.props.contentType.toLowerCase();
      return "/" + media + "/" + name
    }
  };

  render() {
    return (
      <div className="card">
        <Link id="card-title" to={this.createURL()} onClick={this.selectedGenreCallback}>{this.props.name}</Link>
        <img className="card-img-top" src={this.displayImage()} alt="genre icon"/>
      </div>
    );
  }
}

Genre.propTypes  ={
  name: PropTypes.string,
  contentType: PropTypes.string,
  selectedGenreCallback: PropTypes.func
}

export default Genre;
