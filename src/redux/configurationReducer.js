export const DATA_AGREEMENT = 'DATA_AGREEMENT';
export const LIGHT_AGREEMENT = 'LIGHT_AGREEMENT';
export const NOTIFICATION_AGREEMENT = 'NOTIFICATION_AGREEMENT';
export const DATA_DISAGREE_PERDIOD = 'DATA_DISAGREE_PERDIOD';
export const LIGHT_DISAGREE_PERDIOD = 'LIGHT_DISAGREE_PERDIOD';
export const NOTIFICATION_DISAGREE_PERDIOD = 'NOTIFICATION_DISAGREE_PERDIOD';

// -------------- CHECKBOX --------------
function changeDataAgreement() {
  return {
    type: DATA_AGREEMENT,
  };
}
function changeLightAgreement() {
  return {
    type: LIGHT_AGREEMENT,
  };
}
function changeNotificationAgreement() {
  return {
    type: NOTIFICATION_AGREEMENT,
  };
}

// -------------- TEXT --------------
function changeDataDisagreePeriod(period) {
  return {
    type: DATA_DISAGREE_PERDIOD,
    dataDisagreePeriod: period,
  };
}
function changeLightDisagreePeriod(period) {
  return {
    type: LIGHT_DISAGREE_PERDIOD,
    lightDisagreePeriod: period,
  };
}
function changeNotificationDisagreePeriod(period) {
  return {
    type: NOTIFICATION_DISAGREE_PERDIOD,
    notificationDisagreePeriod: period,
  };
}

export const ConfigurationActions = {
  changeDataAgreement,
  changeLightAgreement,
  changeNotificationAgreement,
  changeDataDisagreePeriod,
  changeLightDisagreePeriod,
  changeNotificationDisagreePeriod,
};

const ACTION_HANDLERS = {
  [DATA_AGREEMENT]: state => (
    { ...state, dataAgreement: !state.dataAgreement }
  ),
  [LIGHT_AGREEMENT]: state => (
    { ...state, lightAgreement: !state.lightAgreement }
  ),
  [NOTIFICATION_AGREEMENT]: state => (
    { ...state, notificationAgreement: !state.notificationAgreement }
  ),
  [DATA_DISAGREE_PERDIOD]: (state, action) => (
    { ...state, dataDisagreePeriod: action.dataDisagreePeriod }
  ),
  [LIGHT_DISAGREE_PERDIOD]: (state, action) => (
    { ...state, lightDisagreePeriod: action.lightDisagreePeriod }
  ),
  [NOTIFICATION_DISAGREE_PERDIOD]: (state, action) => (
    { ...state, notificationDisagreePeriod: action.notificationDisagreePeriod }
  ),
};

export const initConfiguration = {
  dataAgreement: true,
  lightAgreement: true,
  notificationAgreement: true,
  dataDisagreePeriod: null,
  lightDisagreePeriod: null,
  notificationDisagreePeriod: null,
};

export default function applicationReducer(state = initConfiguration, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
