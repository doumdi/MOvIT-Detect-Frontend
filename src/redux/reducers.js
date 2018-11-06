/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import recommendationReducer from './recommendationReducer';
import goalReducer from './goalReducer';
import parameterReducer from './parameterReducer';
import configurationReducer from './configurationReducer';
import debugReducer from './debugReducer';

export default combineReducers({
  applicationReducer,
  debugReducer,
  recommendationReducer,
  goalReducer,
  parameterReducer,
  configurationReducer,
});
