import React, { Component, PropTypes } from 'react';
import ReactGoogleMap from './ReactGoogleMap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath, erasePath } from 'redux/modules/map';

@connect(
  state => ({
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
      top: '25px',
      position: 'absolute',
      width: '100px',
      height: '100px',
      left: '20px'
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
    const { path, updatePath } = this.props; // eslint-disable-line
    const tool = this.renderMapTool();
    return (
      <div>
        <ReactGoogleMap
          isDrawingMode={isDrawingMode}
          onClickHandler={this.onClickHandler}
          path={path}
          updatePathHandler={updatePath}
        />
        {tool}
      </div>
    );
  }
}

Map.propTypes = {
  path: PropTypes.array,
  region: PropTypes.string,
};
