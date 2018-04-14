// ------------------------------------
// Constants
// ------------------------------------

let url;

switch (process.env.NODE_ENV) {
  case 'production':
  case 'pi':
    url = 'http://192.168.4.1:1880/';
    break;
  case 'local':
    url = 'http://localhost:1880/';
    break;
  default:
    url = 'https://private-f2484-movitplus.apiary-mock.com/';
}

export const URL = url;
export const LANGUAGE = 'LANGUAGE';
export const FR = 'FR';
export const EN = 'EN';
export const PROFILE = 'PROFILE';
export const TOKEN = 'TOKEN';

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

function changeToken(tokenString) {
  return {
    type: TOKEN,
    token: tokenString,
  };
}

export const ApplicationActions = {
  changeLanguage,
  changeProfile,
  changeToken,
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
  [TOKEN]: (state, action) => (
    { ...state, token: action.token, header: { headers: { Authorization: action.token } } }
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
  token: null,
  header: {},
  maxAngle: null,
  userWeight: null,
};
export default function applicationReducer(state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
