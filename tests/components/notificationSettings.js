/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { URL } from '../../src/redux/applicationReducer';
import NotificationSettings from '../../src/components/notificationSettings';

Enzyme.configure({ adapter: new Adapter() });

describe('NotificationTests Tests', () => {
  let wrapper;
  let store;
  const isLedBlinkingEnabledSpy = sinon.spy();
  const isVibrationEnabledSpy = sinon.spy();
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
    changeIsLedBlinkingEnabled: (value) => { isLedBlinkingEnabledSpy(value); },
    changeIsVibrationEnabled: (value) => { isVibrationEnabledSpy(value); },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<NotificationSettings store={store} {...props} />).dive();
    isLedBlinkingEnabledSpy.resetHistory();
    isVibrationEnabledSpy.resetHistory();
  });

  it('should have proptypes', () => {
    const actualValue = NotificationSettings.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      isLedBlinkingEnabled: PropTypes.bool,
      isVibrationEnabled: PropTypes.bool,
      changeIsLedBlinkingEnabled: PropTypes.func,
      changeIsVibrationEnabled: PropTypes.func,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the notification settings', async () => {
    const mock = new MockAdapter(axios);
    const data = {
      response: true,
    };

    mock.onGet(`${URL}notificationSettings`).reply(200, data);

    const response = await wrapper.instance().getSettings();

    expect(response).toEqual(data);
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
