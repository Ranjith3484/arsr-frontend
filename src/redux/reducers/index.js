import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';

const allReducers= combineReducers({
  loading: loadingReducer
});

export default allReducers;