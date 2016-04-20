import React, { Component, PropTypes } from 'react';
import ReactGoogleMap from './ReactGoogleMap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { erasePath, loadMarker, renderMarker, updatePath } from 'redux/modules/map';

@connect(
  state => ({
    bound: state.map.bound,
    defaultCenter: state.map.defaultCenter,
    isMarkerReady: state.map.isMarkerReady,
    markers: state.map.markers,
    path: state.map.path,
    region: state.map.region,
  }),
  dispatch => bindActionCreators({
    erasePath,
    loadMarker,
    renderMarker,
    updatePath
  }, dispatch)
)
export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      isDrawingMode: false
    };
  }
  componentDidMount() {
    const { bound, loadMarker } = this.props; // eslint-disable-line
    loadMarker(bound.ne, bound.sw);
  }
  onSwitchHandler = () => {
    const { isDrawingMode } = this.state;
    this.setState({ isDrawingMode: !isDrawingMode });
  }
  onErasePathHandler = () => {
    const { erasePath } = this.props; // eslint-disable-line
    const { isDrawingMode } = this.state;
    erasePath();
    this.setState({ isDrawingMode: !isDrawingMode });
  }
  renderMapTool = () => {
    const { region } = this.props;
    const { isDrawingMode } = this.state;
    const style = {
      height: '100px',
      left: '20px',
      position: 'absolute',
      top: '25px',
      width: '100px',
    };
    if (region === 'map') {
      return (
        <button
          style={style}
          onClick={this.onSwitchHandler}
        >
          {isDrawingMode ? 'Drawing' : 'Draw'}
        </button>
      );
    }
    return (
      <button
        style={style}
        onClick={this.onErasePathHandler}
      >
        Erase
      </button>
    );
  }
  render() {
    const { isDrawingMode } = this.state;
    const { defaultCenter, loadMarker, isMarkerReady, markers, polyOptions, path, region, renderMarker, updatePath } = this.props; // eslint-disable-line
    const tool = this.renderMapTool();
    return (
      <div>
        <ReactGoogleMap
          defaultCenter={defaultCenter}
          polyOptions={polyOptions}
          isDrawingMode={isDrawingMode}
          isMarkerReady={isMarkerReady}
          markers={markers}
          onClickHandler={this.onClickHandler}
          region={region}
          path={path}
          renderMarkerHandler={renderMarker}
          updatePathHandler={updatePath}
        />
        {tool}
      </div>
    );
  }
}

Map.propTypes = {
  markers: PropTypes.array,
  path: PropTypes.array,
  region: PropTypes.string,
  polyOptions: PropTypes.object,
};

Map.defaultProps = {
  markers: [],
  path: [],
  polyOptions: {
    strokeColor: '#286404'
  },
  region: 'map'
};
