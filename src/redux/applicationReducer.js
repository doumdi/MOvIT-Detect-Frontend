// ------------------------------------
// Constants
// ------------------------------------
export const LANGUAGE = 'LANGUAGE'
export const FR = 'FR'
export const EN = 'EN'
// ------------------------------------
// Actions
// ------------------------------------
function changeLanguage () {
  return {
    type : LANGUAGE
  }
}
export const ApplicationActions = {
  changeLanguage
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LANGUAGE]: (state, action) => ({...state, language: state.language == FR ? EN : FR})
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initApplication = {
  language: 'FR'
}
export default function applicationReducer (state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}