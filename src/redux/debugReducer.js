/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

export const IS_LED_BLINKING_ENABLED = 'IS_LED_BLINKING_ENABLED';
export const IS_VIBRATION_ENABLED = 'IS_VIBRATION_ENABLED';

// -------------- CHECKBOX --------------
function changeIsLedBlinkingEnabled(isEnabled) {
  return {
    type: IS_LED_BLINKING_ENABLED,
    isLedBlinkingEnabled: isEnabled,
  };
}
function changeIsVibrationEnabled(isEnabled) {
  return {
    type: IS_VIBRATION_ENABLED,
    isVibrationEnabled: isEnabled,
  };
}

export const DebugActions = {
  changeIsLedBlinkingEnabled,
  changeIsVibrationEnabled,
};

const ACTION_HANDLERS = {
  [IS_LED_BLINKING_ENABLED]: (state, action) => (
    { ...state, isLedBlinkingEnabled: action.isLedBlinkingEnabled }
  ),
  [IS_VIBRATION_ENABLED]: (state, action) => (
    { ...state, isVibrationEnabled: action.isVibrationEnabled }
  ),
};

export const initParameter = {
  isLedBlinkingEnabled: true,
  isVibrationEnabled: true,
};

export default function applicationReducer(state = initParameter, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
