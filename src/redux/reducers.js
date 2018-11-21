/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import configurationReducer from './configurationReducer';
import goalReducer from './goalReducer';
import recommendationReducer from './recommendationReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
  applicationReducer,
  settingsReducer,
  recommendationReducer,
  goalReducer,
  configurationReducer,
});
