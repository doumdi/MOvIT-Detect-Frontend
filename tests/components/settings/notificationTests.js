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
    wrapper.setState({ showCountdown: true });
  });

  it('should have proptypes', () => {
    const actualValue = Notification.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
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

  it('should hide the countdown when the calibration is completed', () => {
    wrapper.instance().calibrationCompleted();

    expect(wrapper.state('showCountdown')).toEqual(false);
  });

  it('should show the countdown when calibrating', async () => {
    wrapper.setState({ showCountdown: false });
    await wrapper.instance().calibrate();

    expect(wrapper.state('showCountdown')).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
