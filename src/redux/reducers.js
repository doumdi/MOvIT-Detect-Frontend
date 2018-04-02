import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import recommendationReducer from './recommendationReducer';
import goalReducer from './goalReducer';
import parameterReducer from './parameterReducer';
import configurationReducer from './configurationReducer';

export default combineReducers({
  applicationReducer,
  recommendationReducer,
  goalReducer,
  parameterReducer,
  configurationReducer,
});
