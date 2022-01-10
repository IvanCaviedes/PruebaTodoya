import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import DatosReducer from './DatosReducer'
const reducers = combineReducers({
  AuthReducer,
  DatosReducer
});

export default reducers;