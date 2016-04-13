import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import App from 'containers/App/App';
import DevTools from 'containers/DevTools/DevTools';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const component = (
  // Tell the Router to use our enhanced history
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      {component}
    </Provider>,
    document.getElementById('root')
  );
}
