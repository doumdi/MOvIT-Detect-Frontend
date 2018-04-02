// ------------------------------------
// Constants
// ------------------------------------
export const URL = 'http://localhost:1880/';
export const LANGUAGE = 'LANGUAGE';
export const FR = 'FR';
export const EN = 'EN';
export const PROFILE = 'PROFILE';
export const USER_NAME = 'USER_NAME';
export const USER_ID = 'USER_ID';
export const USER_WEIGHT = 'USER_WEIGHT';
export const MAX_ANGLE = 'MAX_ANGLE';

// ------------------------------------
// Actions
// ------------------------------------
function changeLanguage() {
  return {
    type: LANGUAGE,
  };
}

function changeProfile(profileName) {
  return {
    type: PROFILE,
    profile: profileName,
  };
}

// -------------- TEXT --------------

function changeUserName(name) {
  return {
    type: USER_NAME,
    userName: name,
  };
}
function changeUserID(id) {
  return {
    type: USER_ID,
    userID: id,
  };
}
function changeUserWeight(weight) {
  return {
    type: USER_WEIGHT,
    userWeight: weight,
  };
}
function changeMaxAngle(angle) {
  return {
    type: MAX_ANGLE,
    maxAngle: angle,
  };
}

export const ApplicationActions = {
  changeLanguage,
  changeProfile,
  changeUserName,
  changeUserID,
  changeUserWeight,
  changeMaxAngle,
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LANGUAGE]: state => (
    { ...state, language: state.language === FR ? EN : FR }
  ),
  [PROFILE]: (state, action) => (
    { ...state, profile: action.profile }
  ),
  [USER_NAME]: (state, action) => (
    { ...state, userName: action.userName }
  ),
  [USER_ID]: (state, action) => (
    { ...state, userID: action.userID }
  ),
  [USER_WEIGHT]: (state, action) => (
    { ...state, userWeight: action.userWeight }
  ),
  [MAX_ANGLE]: (state, action) => (
    { ...state, maxAngle: action.maxAngle }
  ),
};

// ------------------------------------
// Reducer
// ------------------------------------

export const initApplication = {
  language: 'FR',
  profile: '',
  userName: '',
  userID: '',
  maxAngle: null,
  userWeight: null,
};
export default function applicationReducer(state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
