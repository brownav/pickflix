import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaCollection from './MediaCollection.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Genre extends Component {

  render() {
    return (
      <Router>
        <section className="genre">
          <div>
            <Link to={"/" + this.props.contentType.toLowerCase() + "/" + this.props.name.toLowerCase()}>{this.props.name}</Link>
          </div>

          <div>
            <Route
              path={"/" + this.props.contentType.toLowerCase() + "/" + this.props.name.toLowerCase()}
              render={() => <MediaCollection genre={this.props.name} contentType={this.props.contentType} />}
            />
          </div>
        </section>
      </Router>
    )
  }
}

Genre.propTypes  ={
  name: PropTypes.string,
  contentType: PropTypes.string
}

export default Genre;
