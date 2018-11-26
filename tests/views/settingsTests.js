/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { URL } from '../../src/redux/applicationReducer';
import Settings from '../../src/views/settings';

Enzyme.configure({ adapter: new Adapter() });

const TIMEOUT = 1000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);

  mock.onGet(`${URL}wifi`).reply(200, { connected: true });
  mock.onGet(`${URL}updates`).reply(200, { isAvailable: true });
  mock.onGet(`${URL}Debug`).reply(200, {});
  mock.onGet(`${URL}memory`).reply(200, { total: 10, used: 5 });
  mock.onGet(`${URL}notificationSettings`).reply(200, {
    isLedBlinkingEnabled: true,
    isVibrationEnabled: true,
    snoozeTime: 60,
  });
  mock.onGet(`${URL}dataAgreement`).reply(200, { dataAgreement: true });
}

describe('Settings Tests', () => {
  let wrapper;
  const initialState = {
    applicationReducer: { language: 'en' },
    settingsReducer: {
      dataAgreement: true,
      totalMemory: 5,
      usedMemory: 10,
      snoozeTime: 60,
      isLedBlinkingEnabled: true,
      isVibrationEnabled: true,
      modulesStatus: {},
      isUpdateAvailable: false,
      isWifiConnected: true,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<Settings store={store} {...props} />).dive();
    wrapper.setState({ isLoaded: true, hasErrors: false });

    const spy = sinon.spy(wrapper.instance(), 'load');

    setTimeout(() => {
      expect(spy.calledOnce).toEqual(true);
      expect(wrapper.state('isLoaded')).toEqual(false);
      expect(wrapper.state('hasUpdateInfoErrors')).toEqual(false);
      expect(wrapper.state('hasModulesStatusErrors')).toEqual(false);
      expect(wrapper.state('hasMemoryUsageErrors')).toEqual(false);
      expect(wrapper.state('hasNotificationSettingsErrors')).toEqual(false);
      expect(wrapper.state('hasPermissionsErrors')).toEqual(false);
      expect(wrapper.state('hasWifiConnectionErrors')).toEqual(false);
    }, TIMEOUT);
  });

  it('should have proptypes', () => {
    const actualValue = Settings.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      dataAgreement: PropTypes.bool.isRequired,
      totalMemory: PropTypes.number.isRequired,
      usedMemory: PropTypes.number.isRequired,
      snoozeTime: PropTypes.number.isRequired,
      isLedBlinkingEnabled: PropTypes.bool.isRequired,
      isVibrationEnabled: PropTypes.bool.isRequired,
      changeDataAgreement: PropTypes.bool.isRequired,
      changeTotalMemory: PropTypes.func.isRequired,
      changeUsedMemory: PropTypes.func.isRequired,
      changeSnoozeTime: PropTypes.func.isRequired,
      changeIsLedBlinkingEnabled: PropTypes.func.isRequired,
      changeIsVibrationEnabled: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should load all the settings', () => {
    const actions = store.getActions();

    expect(actions[0].type).toEqual('IS_UPDATE_AVAILABLE');
    expect(actions[1].type).toEqual('MODULES_STATUS');
    expect(actions[2].type).toEqual('TOTAL_MEMORY');
    expect(actions[3].type).toEqual('USED_MEMORY');
    expect(actions[4].type).toEqual('IS_LED_BLINKING_ENABLED');
    expect(actions[5].type).toEqual('IS_VIBRATION_ENABLED');
    expect(actions[6].type).toEqual('SNOOZE_TIME');
    expect(actions[7].type).toEqual('DATA_AGREEMENT');
    expect(actions[8].type).toEqual('WIFI_CONNECTION');
    expect(actions[0].isUpdateAvailable).toEqual(true);
    expect(actions[1].modulesStatus).toEqual({});
    expect(actions[2].totalMemory).toEqual(10);
    expect(actions[3].usedMemory).toEqual(5);
    expect(actions[4].isLedBlinkingEnabled).toEqual(true);
    expect(actions[5].isVibrationEnabled).toEqual(true);
    expect(actions[6].snoozeTime).toEqual(1);
    expect(actions[7].dataAgreement).toEqual(true);
    expect(actions[8].isWifiConnected).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
