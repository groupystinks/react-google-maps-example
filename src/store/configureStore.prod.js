import { applyMiddleware, createStore } from 'redux';
import reducers from 'redux/modules/reducer';
import clientMiddleware from '../redux/middleware/clientMiddleware';
import { FirebaseApiClient } from '../helpers/ApiClient';

const firebaseApi = new FirebaseApiClient();

const enhancer = applyMiddleware(clientMiddleware({ firebaseApi }));

export default function configureStore(initialState) {
  return createStore(reducers, initialState, enhancer);
}
