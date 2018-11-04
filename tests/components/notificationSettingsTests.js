/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { URL } from '../../src/redux/applicationReducer';
import NotificationSettings from '../../src/components/notificationSettings';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const data = {
    response: true,
  };

  mock.onPost().reply(200);
  mock.onGet(`${URL}notificationSettings`).reply(200, data);
}

describe('NotificationTests Tests', () => {
  let wrapper;
  let store;
  const initialState = {
    applicationReducer: { language: 'en' },
    debugReducer: {
      isLedBlinkingEnabled: true,
      isVibrationEnabled: true,
    },
  };
  const mockStore = configureMockStore();
  const props = {
    isLedBlinkingEnabled: true,
    isVibrationEnabled: true,
  };
  initializeMockAdapter();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<NotificationSettings store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = NotificationSettings.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      snoozeTime: PropTypes.number,
      minimumSnoozeTime: PropTypes.number,
      maximumSnoozeTime: PropTypes.number,
      isLedBlinkingEnabled: PropTypes.bool,
      isVibrationEnabled: PropTypes.bool,
      changeSnoozeTime: PropTypes.func,
      changeIsLedBlinkingEnabled: PropTypes.func,
      changeIsVibrationEnabled: PropTypes.func,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the notification settings', async () => {
    const response = await wrapper.instance().getSettings();

    expect(response).toEqual({ response: true });
  });

  it('should enable the led blinking when checking the led blinking checkbox', () => {
    wrapper.setProps({ isLedBlinkingEnabled: false });
    wrapper.instance().enableLedBlinking();

    const actions = store.getActions();

    expect(actions[0].isLedBlinkingEnabled).toEqual(true);
    expect(actions[0].type).toEqual('IS_LED_BLINKING_ENABLED');
  });

  it('should disable the led blinking when unchecking the led blinking checkbox', () => {
    wrapper.setProps({ isLedBlinkingEnabled: true });
    wrapper.instance().enableLedBlinking();

    const actions = store.getActions();

    expect(actions[0].isLedBlinkingEnabled).toEqual(false);
    expect(actions[0].type).toEqual('IS_LED_BLINKING_ENABLED');
  });

  it('should enable the vibration when checking the vibration checkbox', () => {
    wrapper.setProps({ isVibrationEnabled: false });
    wrapper.instance().enableVibration();

    const actions = store.getActions();

    expect(actions[0].isVibrationEnabled).toEqual(true);
    expect(actions[0].type).toEqual('IS_VIBRATION_ENABLED');
  });

  it('should set the snooze time when changing the input value', () => {
    wrapper.setProps({ snoozeTime: 10 });
    wrapper.instance().changeSnoozeTime(15);

    const actions = store.getActions();

    expect(actions[0].snoozeTime).toEqual(15);
    expect(actions[0].type).toEqual('SNOOZE_TIME');
  });

  it('should disable the vibration when unchecking the vibration checkbox', () => {
    wrapper.setProps({ isVibrationEnabled: true });
    wrapper.instance().enableVibration();

    const actions = store.getActions();

    expect(actions[0].isVibrationEnabled).toEqual(false);
    expect(actions[0].type).toEqual('IS_VIBRATION_ENABLED');
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
