/* GLOBAL: google */
import React, { Component, PropTypes } from 'react';
import { GoogleMap, Polyline, Polygon, OverlayView } from 'react-google-maps';

export default class ReactGoogleMap extends Component { // eslint-disable-line
  constructor() {
    super();
    this.polygonInst = null;
    this.state = {
      startDraw: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.region === 'map' && this.props.region === 'draw') {
      const { renderMarkerHandler } = this.props;
      renderMarkerHandler();
    }
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
  onZoomChangeHandler = () => {
    const bounds = this.refs._map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    console.log('ne, sw', northEast.lat(), northEast.lng(), southWest.lat(), southWest.lng());
    // dispatch action to query back-end.
  }
  renderMarkers() {
    const { isMarkerReady, path, region } = this.props;
    let { markers } = this.props;
    if (markers.length === 0) { return null; }
    if (region === 'draw' && isMarkerReady) {
      const polygonInst = new google.maps.Polygon({ paths: path });
      markers = markers.filter(marker => {
        const markerPosition = new google.maps.LatLng(marker.position.lat, marker.position.lng);
        return google.maps.geometry.poly.containsLocation(markerPosition, polygonInst);
      });
    }
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
  renderPoly = () => {
    const { polyOptions, path, region } = this.props;
    if (region === 'map') {
      return (
        <Polyline
          ref={'polydraw'}
          options={{
            ...polyOptions,
            path
          }}
        />
      );
    }

    return (
      <Polygon
        ref={'polydraw'}
        options={{
          ...polyOptions,
          path
        }}
      />
    );
  }
  render() {
    const { defaultCenter, isDrawingMode } = this.props;
    const markers = this.renderMarkers();
    const poly = this.renderPoly();
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
          onZoomChanged={this.onZoomChangeHandler}
          options={{
            draggable: !isDrawingMode
          }}
          ref={'_map'}
        >
          {markers}
          {poly}
        </GoogleMap>
      </div>
    );
  }
}

ReactGoogleMap.displayName = 'ReactGoogleMap';

ReactGoogleMap.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  isDrawingMode: PropTypes.bool.isRequired,
  isMarkerReady: PropTypes.bool.isRequired,
  markers: PropTypes.array,
  polyOptions: PropTypes.object,
  path: PropTypes.array,
  region: PropTypes.string,
  renderMarkerHandler: PropTypes.func,
  updatePathHandler: PropTypes.func,
};
