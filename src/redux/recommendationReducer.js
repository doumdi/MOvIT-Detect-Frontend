/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

export const REDUCE_WEIGHT = 'REDUCE_WEIGHT';
export const REDUCE_SWELLING = 'REDUCE_SWELLING';
export const REDUCE_SLIDING_MOVING = 'REDUCE_SLIDING_MOVING';
export const REDUCE_SLIDING_REST = 'REDUCE_SLIDING_REST';
export const REDUCE_PAIN = 'REDUCE_PAIN';
export const ALLOW_REST = 'ALLOW_REST';
export const EASE_TRANSFERS = 'EASE_TRANSFERS';
export const IMPROVE_COMFORT = 'IMPROVE_COMFORT';
export const OTHER = 'OTHER';
export const TILT_FREQUENCY_WEIGHT = 'TILT_FREQUENCY_WEIGHT';
export const TILT_FREQUENCY_SWELLING = 'TILT_FREQUENCY_SWELLING';
export const TILT_LENGTH_WEIGHT = 'TILT_LENGTH_WEIGHT';
export const TILT_LENGTH_SWELLING = 'TILT_LENGTH_SWELLING';
export const TILT_ANGLE_WEIGHT = 'TILT_ANGLE_WEIGHT';
export const TILT_ANGLE_SWELLING = 'TILT_ANGLE_SWELLING';
export const TILT_ANGLE_MOVING = 'TILT_ANGLE_MOVING';
export const TILT_ANGLE_REST = 'TILT_ANGLE_REST';
export const REDUCE_PAIN_RECOMMENDATION = 'REDUCE_PAIN_RECOMMENDATION';
export const REDUCE_SWELLING_RECOMMENDATION = 'REDUCE_SWELLING_RECOMMENDATION';
export const ALLOW_REST_RECOMMENDATION = 'ALLOW_REST_RECOMMENDATION';
export const EASE_TRANSFERS_RECOMMENDATION = 'EASE_TRANSFERS_RECOMMENDATION';
export const IMPROVE_COMFORT_RECOMMENDATION = 'IMPROVE_COMFORT_RECOMMENDATION';
export const OTHER_RECOMMENDATION = 'OTHER_RECOMMENDATION';
export const OTHER_RECOMMENDATION_TITLE = 'OTHER_RECOMMENDATION_TITLE';

// -------------- CHECKBOX --------------
function changeReduceWeight() {
  return {
    type: REDUCE_WEIGHT,
  };
}
function changeReduceSwelling() {
  return {
    type: REDUCE_SWELLING,
  };
}
function changeReduceSlidingMoving() {
  return {
    type: REDUCE_SLIDING_MOVING,
  };
}
function changeReduceSlidingRest() {
  return {
    type: REDUCE_SLIDING_REST,
  };
}
function changeReducePain() {
  return {
    type: REDUCE_PAIN,
  };
}
function changeAllowRest() {
  return {
    type: ALLOW_REST,
  };
}
function changeEaseTransfers() {
  return {
    type: EASE_TRANSFERS,
  };
}
function changeImproveComfort() {
  return {
    type: IMPROVE_COMFORT,
  };
}
function changeOther() {
  return {
    type: OTHER,
  };
}

// -------------- SLIDERS --------------

function changeTiltFrequencyWeight(tiltFreq) {
  return {
    type: TILT_FREQUENCY_WEIGHT,
    tiltFrequencyWeight: tiltFreq,
  };
}
function changeTiltLengthWeight(tiltLen) {
  return {
    type: TILT_LENGTH_WEIGHT,
    tiltLengthWeight: tiltLen,
  };
}
function changeTiltAngleWeight(tiltAng) {
  return {
    type: TILT_ANGLE_WEIGHT,
    tiltAngleWeight: tiltAng,
  };
}
function changeTiltAngleMoving(tiltAngMoving) {
  return {
    type: TILT_ANGLE_MOVING,
    tiltAngleMoving: tiltAngMoving,
  };
}
function changeTiltAngleRest(tiltAngRest) {
  return {
    type: TILT_ANGLE_REST,
    tiltAngleRest: tiltAngRest,
  };
}

// -------------- TEXT --------------
function reducePainRecommendation(painRec) {
  return {
    type: REDUCE_PAIN_RECOMMENDATION,
    painRecommendation: painRec,
  };
}
function reduceSwellingRecommendation(swellingRec) {
  return {
    type: REDUCE_SWELLING_RECOMMENDATION,
    swellingRecommendation: swellingRec,
  };
}
function allowRestRecommendation(restRec) {
  return {
    type: ALLOW_REST_RECOMMENDATION,
    restRecommendation: restRec,
  };
}
function easeTransfersRecommendation(transferRec) {
  return {
    type: EASE_TRANSFERS_RECOMMENDATION,
    transferRecommendation: transferRec,
  };
}
function improveComfortRecommendation(comfortRec) {
  return {
    type: IMPROVE_COMFORT_RECOMMENDATION,
    comfortRecommendation: comfortRec,
  };
}
function otherRecommendation(otherRec) {
  return {
    type: OTHER_RECOMMENDATION,
    otherRecommendations: otherRec,
  };
}
function otherRecommendationTitle(otherRec) {
  return {
    type: OTHER_RECOMMENDATION_TITLE,
    otherRecommendationsTitle: otherRec,
  };
}
export const RecommendationActions = {
  changeReduceWeight,
  changeReduceSwelling,
  changeReduceSlidingMoving,
  changeReduceSlidingRest,
  changeReducePain,
  changeAllowRest,
  changeEaseTransfers,
  changeImproveComfort,
  changeOther,
  changeTiltFrequencyWeight,
  changeTiltLengthWeight,
  changeTiltAngleWeight,
  changeTiltAngleMoving,
  changeTiltAngleRest,
  reducePainRecommendation,
  reduceSwellingRecommendation,
  allowRestRecommendation,
  easeTransfersRecommendation,
  improveComfortRecommendation,
  otherRecommendation,
  otherRecommendationTitle,
};
const ACTION_HANDLERS = {
  [REDUCE_WEIGHT]: state => (
    { ...state, reduceWeight: !state.reduceWeight }
  ),
  [REDUCE_SWELLING]: state => (
    { ...state, reduceSwelling: !state.reduceSwelling }
  ),
  [REDUCE_SLIDING_MOVING]: state => (
    { ...state, reduceSlidingMoving: !state.reduceSlidingMoving }
  ),
  [REDUCE_SLIDING_REST]: state => (
    { ...state, reduceSlidingRest: !state.reduceSlidingRest }
  ),
  [REDUCE_PAIN]: state => (
    { ...state, reducePain: !state.reducePain }
  ),
  [ALLOW_REST]: state => (
    { ...state, allowRest: !state.allowRest }
  ),
  [EASE_TRANSFERS]: state => (
    { ...state, easeTransfers: !state.easeTransfers }
  ),
  [IMPROVE_COMFORT]: state => (
    { ...state, improveComfort: !state.improveComfort }
  ),
  [OTHER]: state => (
    { ...state, other: !state.other }
  ),
  [TILT_FREQUENCY_WEIGHT]: (state, action) => (
    { ...state, tiltFrequencyWeight: action.tiltFrequencyWeight }
  ),
  [TILT_LENGTH_WEIGHT]: (state, action) => (
    { ...state, tiltLengthWeight: action.tiltLengthWeight }
  ),
  [TILT_ANGLE_WEIGHT]: (state, action) => (
    { ...state, tiltAngleWeight: action.tiltAngleWeight }
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
  [REDUCE_SWELLING_RECOMMENDATION]: (state, action) => (
    { ...state, swellingRecommendation: action.swellingRecommendation }
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
  ),
  [OTHER_RECOMMENDATION_TITLE]: (state, action) => (
    { ...state, otherRecommendationsTitle: action.otherRecommendationsTitle }
  ),
};
export const initRecommendation = {
  reduceWeight: false,
  reduceSwelling: false,
  reduceSlidingMoving: false,
  reduceSlidingRest: false,
  reducePain: false,
  allowRest: false,
  easeTransfers: false,
  improveComfort: false,
  other: false,
  tiltFrequencyWeight: 0,
  tiltLengthWeight: 0,
  tiltAngleWeight: 0,
  tiltAngleMoving: 0,
  tiltAngleRest: 0,
  tiltFrequencyGoal: 0,
  tiltLengthGoal: 0,
  tiltAngleGoal: 0,
};
export default function applicationReducer(state = initRecommendation, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
