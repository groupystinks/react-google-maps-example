import { applyMiddleware, createStore } from 'redux';
import reducers from 'redux/modules/reducer';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import { ApiClient } from '../helpers/ApiClient';

const azureApi = new ApiClient();

const enhancer = applyMiddleware(clientMiddleware({ azureApi }));

export default function configureStore(initialState) {
  return createStore(reducers, initialState, enhancer);
}
