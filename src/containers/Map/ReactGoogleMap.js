/* GLOBAL: google */
import React, { Component, PropTypes } from 'react';
import { GoogleMap, Polyline, OverlayView } from 'react-google-maps';
const styles = {
  overlayView: {
    background: 'white',
    border: '1px solid #ccc',
    padding: 15,
  },
};

export default class ReactGoogleMap extends Component { //eslint-disable-line
  constructor() {
    super();
    this.state = {
      startDraw: false
    };
  }
  onMousemoveHandler = (e) => {
    const { isDrawingMode } = this.props;
    const { startDraw } = this.state;
    if (isDrawingMode && startDraw) {
      this.refs.polydraw.getPath().push(e.latLng);
    }
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
  renderMarkers() {
    const { markers } = this.props;
    return markers.map(marker => { //eslint-disable-line
      return (
        <OverlayView
          position={marker.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={this.getPixelPositionOffset}
        >
          <svg>
            <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" strokeWidth="5" />
          </svg>
        </OverlayView>
      );
    });
  }
  render() {
    const { polylineOptions, isDrawingMode, path, region } = this.props;
    const markers = this.renderMarkers();
    const isRegionDrawn = (region === 'draw');
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
          onMousemove={this.onMousemoveHandler}
          options={{
            draggable: !isDrawingMode
          }}
          ref={'_map'}
        >
          {markers}
          <Polyline
            ref={'polydraw'}
            options={{
              ...polylineOptions,
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
  markers: PropTypes.array,
  polylineOptions: PropTypes.object,
  path: PropTypes.array,
  region: PropTypes.string,
  updatePathHandler: PropTypes.func,
};
