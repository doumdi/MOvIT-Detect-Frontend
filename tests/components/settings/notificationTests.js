/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Notification from '../../../src/components/settings/notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
  };

  beforeEach(() => {
    jest.setTimeout(10000);

    wrapper = shallow(<Notification store={store} {...props} />).dive();
    wrapper.setState({ showCountdownIMU: true });
  });

  it('should have proptypes', () => {
    const actualValue = Notification.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger calibrate when clicking on button', () => {
    const spy = sinon.spy(wrapper.instance(), 'calibrate');

    wrapper.find('#calibrate-button').simulate('click');

    expect(spy.calledOnce).toEqual(true);
  });

  it('should trigger turnOnNotification when clicking on button', () => {
    const spy = sinon.spy(wrapper.instance(), 'turnOnNotification');

    wrapper.find('#turn-on-button').simulate('click');

    expect(spy.calledOnce).toEqual(true);
  });

  it('should trigger turnOffNotification when clicking on button', () => {
    const spy = sinon.spy(wrapper.instance(), 'turnOffNotification');

    wrapper.find('#turn-off-button').simulate('click');

    expect(spy.calledOnce).toEqual(true);
  });

  it('should hide the countdown when the mat calibration is completed', () => {
    wrapper.instance().matCalibrationCompleted();

    expect(wrapper.state('showCountdownMat')).toEqual(false);
  });

  it('should show the countdown when calibrating the mat', async () => {
    wrapper.setState({ showCountdownMat: false });
    await wrapper.instance().calibrate();

    expect(wrapper.state('showCountdownMat')).toEqual(true);
  });

  it('should hide the countdown when the IMU calibration is completed', () => {
    wrapper.instance().IMUCalibrationCompleted();

    expect(wrapper.state('showCountdownIMU')).toEqual(false);
  });

  it('should show the countdown when calibrating the IMU', async () => {
    wrapper.setState({ showCountdownIMU: false });
    await wrapper.instance().calibrateIMU();

    expect(wrapper.state('showCountdownIMU')).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
