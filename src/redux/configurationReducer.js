/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

export const USER_NAME = 'USER_NAME';
export const USER_ID = 'USER_ID';
export const USER_WEIGHT = 'USER_WEIGHT';
export const MAX_ANGLE = 'MAX_ANGLE';


// ------------------------------------
// Actions
// ------------------------------------

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
export const ConfigurationActions = {
  changeUserName,
  changeUserID,
  changeUserWeight,
  changeMaxAngle,
};

const ACTION_HANDLERS = {
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

export const initConfiguration = {
  userName: '',
  userID: '',
  maxAngle: null,
  userWeight: null,
};
export default function applicationReducer(state = initConfiguration, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
