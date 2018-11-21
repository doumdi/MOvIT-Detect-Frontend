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
import NotificationSettings from '../../../src/components/settings/notificationSettings';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);

  mock.onPost(`${URL}notificationSettings`).reply(200);
}

describe('NotificationTests Tests', () => {
  let wrapper;
  let store;
  const snoozeTimeSpy = sinon.spy();
  const isLedBlinkingEnabledSpy = sinon.spy();
  const isVibrationEnabledSpy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const props = {
    snoozeTime: 15,
    isLedBlinkingEnabled: true,
    isVibrationEnabled: true,
    changeSnoozeTime: (value) => { snoozeTimeSpy(value); },
    changeIsLedBlinkingEnabled: (value) => { isLedBlinkingEnabledSpy(value); },
    changeIsVibrationEnabled: (value) => { isVibrationEnabledSpy(value); },
    hasErrors: false,
  };

  initializeMockAdapter();

  beforeEach(() => {
    snoozeTimeSpy.resetHistory();
    isLedBlinkingEnabledSpy.resetHistory();
    isVibrationEnabledSpy.resetHistory();

    store = mockStore(initialState);
    wrapper = shallow(<NotificationSettings store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = NotificationSettings.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      snoozeTime: PropTypes.number.isRequired,
      isLedBlinkingEnabled: PropTypes.bool.isRequired,
      isVibrationEnabled: PropTypes.bool.isRequired,
      changeSnoozeTime: PropTypes.func.isRequired,
      changeIsLedBlinkingEnabled: PropTypes.func.isRequired,
      changeIsVibrationEnabled: PropTypes.func.isRequired,
      hasErrors: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger changeIsLedBlinkingEnabled when simulating a change on the led checkbox', () => {
    wrapper.setProps({ isLedBlinkingEnabled: false });

    wrapper.instance().enableLedBlinking();

    expect(isLedBlinkingEnabledSpy.calledOnce).toEqual(true);
    expect(isLedBlinkingEnabledSpy.getCalls()[0].args[0]).toEqual(true);
  });

  it('should triggger changeIsVibrationEnabled when simulating a change on the vibration checkbox', () => {
    wrapper.setProps({ isVibrationEnabled: false });

    wrapper.instance().enableVibration();

    expect(isVibrationEnabledSpy.calledOnce).toEqual(true);
    expect(isVibrationEnabledSpy.getCalls()[0].args[0]).toEqual(true);
  });

  it('should trigger changeSnoozeTime when changing the input value', () => {
    wrapper.instance().changeSnoozeTime(10);

    expect(snoozeTimeSpy.calledOnce).toEqual(true);
    expect(snoozeTimeSpy.getCalls()[0].args[0]).toEqual(10);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
