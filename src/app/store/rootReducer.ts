import { combineReducers } from 'redux';
import globalReducer from './global/reducer';
import elementReducer from './element/reducer';

const rootReducer = combineReducers({
  global: globalReducer,
  elements: elementReducer
});

export default rootReducer;
