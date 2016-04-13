/* GLOBAL: google */
import React, { Component, PropTypes } from 'react';
import { GoogleMap, Polyline } from 'react-google-maps';

export default class ReactGoogleMap extends Component { //eslint-disable-line
  constructor() {
    super();
    this.state = {
      startDraw: false
    };
  }
  // componentWillUpdate(nextProps) {
  //   if (nextProps.isDrawingMode) {
  //     this.refs.polydraw.setMap(null);
  //     console.log(this.refs.polydraw);
  //   }
  // }
  onMouseoverHandler = () => {
    // this.polydraw = new google.maps.Polyline({ map: this.refs.map, clickable: false });
    // this.move = google.maps.event.addListener(this.refs.map, 'mousemove', (e) => {
    //   this.refs.polydraw.getPath().push(e.latLng);
    // });
    // console.log('this.move', this.move);
  }
  onMousemoveHandler = (e) => {
    const { isDrawingMode } = this.props;
    const { startDraw } = this.state;
    if (isDrawingMode && startDraw) {
      this.refs.polydraw.getPath().push(e.latLng);
      // const path = this.refs.polydraw.getPath();
    }
  }
  onMouseoutHandler = () => {
    google.maps.event.removeListener(this.move);
  }
  onMousedownHandler = () => {
    this.setState({ startDraw: true });
  }
  onMouseupHandler = () => {
    const { isDrawingMode } = this.props;
    const { startDraw } = this.state;
    if (isDrawingMode && startDraw) {
      const { updatePathHandler } = this.props;
      const path = this.refs.polydraw.getPath();
      updatePathHandler(path.j);
      this.setState({ startDraw: false });
    }
  }
  render() {
    const { path, isDrawingMode } = this.props;
    return (
      <div
        onMouseDown={this.onMousedownHandler}
        onMouseUp={this.onMouseupHandler}
      >
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
            },
          }}
          defaultZoom={14}
          defaultCenter={new google.maps.LatLng(25.033, 121.565)}
          onMouseover={this.onMouseOverHandler}
          onMousemove={this.onMousemoveHandler}
          onMouseout={this.onMouseoutHandler}
          options={{
            draggable: !isDrawingMode
          }}
          ref={'_map'}
        >
          <Polyline
            ref={'polydraw'}
            options={{
              path
            }}
          />
        </GoogleMap>
      </div>
    );
  }
}

ReactGoogleMap.propTypes = {
  isDrawingMode: PropTypes.bool,
  path: PropTypes.array,
  updatePathHandler: PropTypes.func,
};
