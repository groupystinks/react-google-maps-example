import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import map from './map';
import word from './word';

export default combineReducers({
  auth,
  map,
  word,
  // Add the reducer to store on the `routing` key
  routing: routerReducer
});
