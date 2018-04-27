/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

export const TILT_FREQUENCY_GOAL = 'TILT_FREQUENCY_GOAL';
export const TILT_LENGTH_GOAL = 'TILT_LENGTH_GOAL';
export const TILT_ANGLE_GOAL = 'TILT_ANGLE_GOAL';


// -------------- SLIDERS --------------

function changeTiltFrequencyGoal(tiltFreq) {
  return {
    type: TILT_FREQUENCY_GOAL,
    tiltFrequencyGoal: tiltFreq,
  };
}
function changeTiltLengthGoal(tiltLen) {
  return {
    type: TILT_LENGTH_GOAL,
    tiltLengthGoal: tiltLen,
  };
}
function changeTiltAngleGoal(tiltAng) {
  return {
    type: TILT_ANGLE_GOAL,
    tiltAngleGoal: tiltAng,
  };
}

export const GoalActions = {
  changeTiltFrequencyGoal,
  changeTiltLengthGoal,
  changeTiltAngleGoal,
};

const ACTION_HANDLERS = {
  [TILT_FREQUENCY_GOAL]: (state, action) => (
    { ...state, tiltFrequencyGoal: action.tiltFrequencyGoal }
  ),
  [TILT_LENGTH_GOAL]: (state, action) => (
    { ...state, tiltLengthGoal: action.tiltLengthGoal }
  ),
  [TILT_ANGLE_GOAL]: (state, action) => (
    { ...state, tiltAngleGoal: action.tiltAngleGoal }
  ),
};

// ------------------------------------
// Reducer
// ------------------------------------

export const initGoal = {
  tiltFrequencyGoal: 0,
  tiltLengthGoal: 0,
  tiltAngleGoal: 0,
};

export default function applicationReducer(state = initGoal, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

