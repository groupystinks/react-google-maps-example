import React, { Component, PropTypes } from 'react';
import Map from '../Map/Map';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <div>
        <Map />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
