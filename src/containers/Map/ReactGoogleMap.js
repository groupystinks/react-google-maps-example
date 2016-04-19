/* GLOBAL: google */
import React, { Component, PropTypes } from 'react';
import { GoogleMap, Polyline, OverlayView } from 'react-google-maps';

export default class ReactGoogleMap extends Component { // eslint-disable-line
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
    const { isDrawingMode } = this.props;
    if (isDrawingMode) {
      this.setState({ startDraw: true });
    }
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
    if (markers.length === 0) { return null; }
    return markers.map(marker => { //eslint-disable-line
      return (
        <OverlayView
          key={marker.key}
          position={marker.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <svg>
            <circle cx="7" cy="7" r="4.5" stroke="red" fill="transparent" strokeWidth="5" />
          </svg>
        </OverlayView>
      );
    });
  }
  render() {
    const { defaultCenter, polylineOptions, isDrawingMode, path } = this.props;
    const markers = this.renderMarkers();
    return (
      <div
        onMouseDown={this.onMousedownHandler}
        onMouseUp={this.onMouseupHandler}
        style={{
          cursor: isDrawingMode ? 'crosshair' : 'default'
        }}
      >
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
            },
          }}
          defaultZoom={14}
          defaultCenter={new google.maps.LatLng(defaultCenter.lat, defaultCenter.lng)}
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

ReactGoogleMap.displayName = 'ReactGoogleMap';

ReactGoogleMap.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  isDrawingMode: PropTypes.bool.isRequired,
  markers: PropTypes.array,
  polylineOptions: PropTypes.object,
  path: PropTypes.array,
  region: PropTypes.string,
  updatePathHandler: PropTypes.func,
};
