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

// ------------------------------------
// Actions
// ------------------------------------
function changeLanguage() {
  return {
    type: LANGUAGE
  };
}
//-------------- CHECKBOX --------------
function changeReduceWeight() {
  return {
    type: REDUCE_WEIGHT
  };
}
function changeReduceSwelling() {
  return {
    type: REDUCE_SWELLING
  }
}
function changeReduceSlidingMoving(){
  return {
    type : REDUCE_SLIDING_MOVING
  }
}
function changeReduceSlidingRest(){
  return {
    type : REDUCE_SLIDING_REST
  }
}
function changeReducePain(){
  return {
    type : REDUCE_PAIN
  }
}
function changeAllowRest(){
  return {
    type : ALLOW_REST
  }
}
function changeEaseTransfers(){
  return {
    type : EASE_TRANSFERS
  }
}
function changeImproveComfort(){
  return {
    type : IMPROVE_COMFORT
  }
}
function changeOther(){
  return {
    type : OTHER
  }
}
//-------------- SLIDERS --------------

function changeTiltFrequency(tiltFrequency) {
  return {
    type : TILT_FREQUENCY,
    tiltFrequency: tiltFrequency
  }
}
function changeTiltLength(tiltLength){
  return {
    type : TILT_LENGTH,
    tiltLength : tiltLength
  }
}
function changeTiltAngle(tiltAngle){
  return {
    type : TILT_ANGLE,
    tiltAngle : tiltAngle
  }
}
function changeTiltAngleMoving(tiltAngleMoving){
  return {
    type : TILT_ANGLE_MOVING,
    tiltAngleMoving : tiltAngleMoving
  }
}
function changeTiltAngleRest(tiltAngleRest){
  return {
    type : TILT_ANGLE_REST,
    tiltAngleRest : tiltAngleRest
  }
}

//-------------- TEXT --------------

function reducePainRecommendation(painRecommendation){
  return {
    type : REDUCE_PAIN_RECOMMENDATION,
    painRecommendation : painRecommendation
  }
}
function allowRestRecommendation(restRecommendation){
  return {
    type : ALLOW_REST_RECOMMENDATION,
    restRecommendation : restRecommendation
  }
}
function easeTransfersRecommendation(transferRecommendation){
  return {
    type : EASE_TRANSFERS_RECOMMENDATION,
    transferRecommendation : transferRecommendation
  }
}
function improveComfortRecommendation(comfortRecommendation){
  return {
    type : IMPROVE_COMFORT_RECOMMENDATION,
    comfortRecommendation : comfortRecommendation
  }
}
function otherRecommendation(otherRecommendations){
  return {
    type : OTHER_RECOMMENDATION,
    otherRecommendations: otherRecommendations
  }
}
export const ApplicationActions = {
  changeLanguage,
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
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LANGUAGE]: (state, action) => ({...state, language: state.language == FR ? EN : FR}),
  [REDUCE_WEIGHT]: (state, action) => ({...state, reduceWeight: state.reduceWeight == true ? false : true}),
  [REDUCE_SWELLING]: (state, action) => ({...state, reduceSwelling: state.reduceSwelling == true ? false : true}),
  [REDUCE_SLIDING_MOVING]: (state, action) => ({...state, reduceSlidingMoving: state.reduceSlidingMoving == true ? false : true}),
  [REDUCE_SLIDING_REST]: (state, action) => ({...state, reduceSlidingRest: state.reduceSlidingRest == true ? false : true}),
  [REDUCE_PAIN]: (state, action) => ({...state, reducePain: state.reducePain == true ? false : true}),
  [ALLOW_REST]: (state, action) => ({...state, allowRest: state.allowRest == true ? false : true}),
  [EASE_TRANSFERS]: (state, action) => ({...state, easeTransfers: state.easeTransfers == true ? false : true}),
  [IMPROVE_COMFORT]: (state, action) => ({...state, improveComfort: state.improveComfort == true ? false : true}),
  [OTHER]: (state, action) => ({...state, other: state.other == true ? false : true}),
  [TILT_FREQUENCY]: (state, action) => ({...state, tiltFrequency : action.tiltFrequency}),
  [TILT_LENGTH]: (state, action) => ({...state, tiltLength : action.tiltLength}),
  [TILT_ANGLE]: (state, action) => ({...state, tiltAngle : action.tiltAngle}),
  [TILT_ANGLE_MOVING]: (state, action) => ({...state, tiltAngleMoving : action.tiltAngleMoving}),
  [TILT_ANGLE_REST]: (state, action) => ({...state, tiltAngleRest : action.tiltAngleRest}),
  [REDUCE_PAIN_RECOMMENDATION]: (state, action) => ({...state, painRecommendation : action.painRecommendation}),
  [ALLOW_REST_RECOMMENDATION]: (state, action) => ({...state, restRecommendation : action.restRecommendation}),
  [EASE_TRANSFERS_RECOMMENDATION]: (state, action) => ({...state, transferRecommendation : action.transferRecommendation}),
  [IMPROVE_COMFORT_RECOMMENDATION]: (state, action) => ({...state, comfortRecommendation : action.comfortRecommendation}),
  [OTHER_RECOMMENDATION]: (state, action) => ({...state, otherRecommendations : action.otherRecommendations})
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initApplication = {
  language: 'FR',
  reduceWeight: true,
  reduceSwelling: true,
  reduceSlidingMoving: false,
  reduceSlidingRest: false,
  reducePain: false,
  allowRest: false,
  easeTransfers: false,
  improveComfort: false,
  other:false,
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
}
export default function applicationReducer (state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
