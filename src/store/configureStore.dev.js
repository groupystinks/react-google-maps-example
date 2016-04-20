import { applyMiddleware, createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import reducers from 'redux/modules/reducer';
import DevTools from '../containers/DevTools/DevTools';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import { ApiClient } from '../helpers/ApiClient';

const azureApi = new ApiClient();
const enhancer = compose(
  applyMiddleware(clientMiddleware({ azureApi })),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../redux/modules/reducer', () =>
      store.replaceReducer(require('../redux/modules/reducer').default)
    );
  }

  return store;
}
