/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

// ------------------------------------
// Constants
// ------------------------------------

let url;
let isDemo = false;
const offset = Math.ceil(new Date().getTimezoneOffset() / 60) * -1;

const port = process.env.PORT || 1880;

console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case 'production':
  case 'pi':
    url = `http://192.168.4.1:${port}/`;
    break;
  case 'local':
    url = `http://localhost:${port}/`;
    break;
  case 'demos':
    isDemo = true;
    url = 'https://private-f2484-movitplus.apiary-mock.com/';
    break;
  default:
    url = 'https://private-f2484-movitplus.apiary-mock.com/';
}

export const URL = url;
export const OFFSET = offset;
export const IS_DEMO = isDemo;
export const IS_MOBILE = window.innerWidth <= 500;
export const IS_TABLET = window.innerWidth <= 780;
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
