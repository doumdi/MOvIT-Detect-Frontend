/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

export const SNOOZE_TIME = 'SNOOZE_TIME';
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

// -------------- TIME PICKER --------------
function changeSnoozeTime(time) {
  return {
    type: SNOOZE_TIME,
    snoozeTime: time,
  }
}

export const DebugActions = {
  changeIsLedBlinkingEnabled,
  changeIsVibrationEnabled,
  changeSnoozeTime,
};

const ACTION_HANDLERS = {
  [IS_LED_BLINKING_ENABLED]: (state, action) => (
    { ...state, isLedBlinkingEnabled: action.isLedBlinkingEnabled }
  ),
  [IS_VIBRATION_ENABLED]: (state, action) => (
    { ...state, isVibrationEnabled: action.isVibrationEnabled }
  ),
  [SNOOZE_TIME]: (state, action) => (
    { ...state, snoozeTime: action.snoozeTime }
  )
};

export const initParameter = {
  isLedBlinkingEnabled: true,
  isVibrationEnabled: true,
  snoozeTime: 10,
};

export default function applicationReducer(state = initParameter, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
