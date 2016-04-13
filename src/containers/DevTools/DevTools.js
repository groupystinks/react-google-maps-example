import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h' // eslint-disable-line
    changePositionKey='ctrl-q' // eslint-disable-line
  >
    <LogMonitor />
  </DockMonitor>
);
