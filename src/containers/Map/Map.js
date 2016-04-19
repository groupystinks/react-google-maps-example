import React, { Component, PropTypes } from 'react';
import ReactGoogleMap from './ReactGoogleMap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath, erasePath } from 'redux/modules/map';

@connect(
  state => ({
    defaultCenter: state.map.defaultCenter,
    markers: state.map.markers,
    path: state.map.path,
    region: state.map.region,
  }),
  dispatch => bindActionCreators({
    erasePath,
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
    const { defaultCenter, markers, polylineOptions, path, region, updatePath } = this.props; // eslint-disable-line
    const tool = this.renderMapTool();
    return (
      <div>
        <ReactGoogleMap
          defaultCenter={defaultCenter}
          polylineOptions={polylineOptions}
          isDrawingMode={isDrawingMode}
          markers={markers}
          onClickHandler={this.onClickHandler}
          region={region}
          path={path}
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
  polylineOptions: PropTypes.object,
};

Map.defaultProps = {
  markers: [],
  path: [],
  polylineOptions: {
    strokeColor: '#286404'
  },
  region: 'map'
};
