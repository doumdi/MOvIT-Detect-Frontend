// ------------------------------------
// Constants
// ------------------------------------
export const LANGUAGE = 'LANGUAGE';
export const FR = 'FR';
export const EN = 'EN';
export const REDUCE_WEIGHT = 'REDUCE_WEIGHT';
export const REDUCE_SWELLING = 'REDUCE_SWELLING';
export const REDUCE_SLIDING_MOVING = 'REDUCE_SLIDING_MOVING';
export const REDUCE_SLIDING_REST = 'REDUCE_SLIDING_REST';
export const REDUCE_PAIN = 'REDUCE_PAIN';
export const ALLOW_REST = 'ALLOW_REST';
export const EASE_TRANSFERS = 'EASE_TRANSFERS';
export const IMPROVE_COMFORT = 'IMPROVE_COMFORT';
export const OTHER = 'OTHER';
export const TILT_FREQUENCY = 'TILT_FREQUENCY';
export const TILT_LENGTH = 'TILT_LENGTH';
export const TILT_ANGLE = 'TILT_ANGLE';
export const TILT_ANGLE_MOVING = 'TILT_ANGLE_MOVING';
export const TILT_ANGLE_REST = 'TILT_ANGLE_REST';
export const REDUCE_PAIN_RECOMMENDATION = 'REDUCE_PAIN_RECOMMENDATION';
export const ALLOW_REST_RECOMMENDATION = 'ALLOW_REST_RECOMMENDATION';
export const EASE_TRANSFERS_RECOMMENDATION = 'EASE_TRANSFERS_RECOMMENDATION';
export const IMPROVE_COMFORT_RECOMMENDATION = 'IMPROVE_COMFORT_RECOMMENDATION';
export const OTHER_RECOMMENDATION = 'OTHER_RECOMMENDATION';
export const PROFILE = 'PROFILE';

// ------------------------------------
// Actions
// ------------------------------------
function changeLanguage() {
  return {
    type: LANGUAGE
  };
}

function changeProfile(profileName) {
  return {
    type: PROFILE,
    profile: profileName
  };
}

// -------------- CHECKBOX --------------
function changeReduceWeight() {
  return {
    type: REDUCE_WEIGHT
  };
}
function changeReduceSwelling() {
  return {
    type: REDUCE_SWELLING
  };
}
function changeReduceSlidingMoving() {
  return {
    type: REDUCE_SLIDING_MOVING
  };
}
function changeReduceSlidingRest() {
  return {
    type: REDUCE_SLIDING_REST
  };
}
function changeReducePain() {
  return {
    type: REDUCE_PAIN
  };
}
function changeAllowRest() {
  return {
    type: ALLOW_REST
  };
}
function changeEaseTransfers() {
  return {
    type: EASE_TRANSFERS
  };
}
function changeImproveComfort() {
  return {
    type: IMPROVE_COMFORT
  };
}
function changeOther() {
  return {
    type: OTHER
  };
}
// -------------- SLIDERS --------------

function changeTiltFrequency(tiltFreq) {
  return {
    type: TILT_FREQUENCY,
    tiltFrequency: tiltFreq
  };
}
function changeTiltLength(tiltLen) {
  return {
    type: TILT_LENGTH,
    tiltLength: tiltLen
  };
}
function changeTiltAngle(tiltAng) {
  return {
    type: TILT_ANGLE,
    tiltAngle: tiltAng
  };
}
function changeTiltAngleMoving(tiltAngMoving) {
  return {
    type: TILT_ANGLE_MOVING,
    tiltAngleMoving: tiltAngMoving
  };
}
function changeTiltAngleRest(tiltAngRest) {
  return {
    type: TILT_ANGLE_REST,
    tiltAngleRest: tiltAngRest
  };
}

// -------------- TEXT --------------

function reducePainRecommendation(painRec) {
  return {
    type: REDUCE_PAIN_RECOMMENDATION,
    painRecommendation: painRec
  };
}
function allowRestRecommendation(restRec) {
  return {
    type: ALLOW_REST_RECOMMENDATION,
    restRecommendation: restRec
  };
}
function easeTransfersRecommendation(transferRec) {
  return {
    type: EASE_TRANSFERS_RECOMMENDATION,
    transferRecommendation: transferRec
  };
}
function improveComfortRecommendation(comfortRec) {
  return {
    type: IMPROVE_COMFORT_RECOMMENDATION,
    comfortRecommendation: comfortRec
  };
}
function otherRecommendation(otherRec) {
  return {
    type: OTHER_RECOMMENDATION,
    otherRecommendations: otherRec
  };
}
export const ApplicationActions = {
  changeLanguage,
  changeProfile,
  changeReduceWeight,
  changeReduceSwelling,
  changeReduceSlidingMoving,
  changeReduceSlidingRest,
  changeReducePain,
  changeAllowRest,
  changeEaseTransfers,
  changeImproveComfort,
  changeOther,
  changeTiltFrequency,
  changeTiltLength,
  changeTiltAngle,
  changeTiltAngleMoving,
  changeTiltAngleRest,
  reducePainRecommendation,
  allowRestRecommendation,
  easeTransfersRecommendation,
  improveComfortRecommendation,
  otherRecommendation
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LANGUAGE]: (state) => (
    { ...state, language: state.language === FR ? EN : FR }
  ),
  [PROFILE]: (state, action) => (
    { ...state, profile: action.profile }
  ),
  [REDUCE_WEIGHT]: (state) => (
    { ...state, reduceWeight: !state.reduceWeight }
  ),
  [REDUCE_SWELLING]: (state) => (
    { ...state, reduceSwelling: !state.reduceSwelling }
  ),
  [REDUCE_SLIDING_MOVING]: (state) => (
    { ...state, reduceSlidingMoving: !state.reduceSlidingMoving }
  ),
  [REDUCE_SLIDING_REST]: (state) => (
    { ...state, reduceSlidingRest: !state.reduceSlidingRest }
  ),
  [REDUCE_PAIN]: (state) => (
    { ...state, reducePain: !state.reducePain }
  ),
  [ALLOW_REST]: (state) => (
    { ...state, allowRest: !state.allowRest }
  ),
  [EASE_TRANSFERS]: (state) => (
    { ...state, easeTransfers: !state.easeTransfers }
  ),
  [IMPROVE_COMFORT]: (state) => (
    { ...state, improveComfort: !state.improveComfort }
  ),
  [OTHER]: (state) => (
    { ...state, other: !state.other }),
  [TILT_FREQUENCY]: (state, action) => (
    { ...state, tiltFrequency: action.tiltFrequency }
  ),
  [TILT_LENGTH]: (state, action) => (
    { ...state, tiltLength: action.tiltLength }
  ),
  [TILT_ANGLE]: (state, action) => (
    { ...state, tiltAngle: action.tiltAngle }
  ),
  [TILT_ANGLE_MOVING]: (state, action) => (
    { ...state, tiltAngleMoving: action.tiltAngleMoving }
  ),
  [TILT_ANGLE_REST]: (state, action) => (
    { ...state, tiltAngleRest: action.tiltAngleRest }
  ),
  [REDUCE_PAIN_RECOMMENDATION]: (state, action) => (
    { ...state, painRecommendation: action.painRecommendation }
  ),
  [ALLOW_REST_RECOMMENDATION]: (state, action) => (
    { ...state, restRecommendation: action.restRecommendation }
  ),
  [EASE_TRANSFERS_RECOMMENDATION]: (state, action) => (
    { ...state, transferRecommendation: action.transferRecommendation }
  ),
  [IMPROVE_COMFORT_RECOMMENDATION]: (state, action) => (
    { ...state, comfortRecommendation: action.comfortRecommendation }
  ),
  [OTHER_RECOMMENDATION]: (state, action) => (
    { ...state, otherRecommendations: action.otherRecommendations }
  )
};

// ------------------------------------
// Reducer
// ------------------------------------

export const initApplication = {
  language: 'FR',
  profile: '',
  reduceWeight: true,
  reduceSwelling: true,
  reduceSlidingMoving: false,
  reduceSlidingRest: false,
  reducePain: false,
  allowRest: false,
  easeTransfers: false,
  improveComfort: false,
  other: false,
  tiltFrequency: 0,
  tiltLength: 0,
  tiltAngle: 0,
  tiltAngleMoving: 0,
  tiltAngleRest: 0,
  painRecommendation: '',
  restRecommendation: '',
  transferRecommendation: '',
  comfortRecommendation: '',
  otherRecommendations: ''
};
export default function applicationReducer(state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
