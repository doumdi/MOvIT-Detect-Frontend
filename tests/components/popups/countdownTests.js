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
import { Dialog } from 'primereact/components/dialog/Dialog';

import Countdown from '../../../src/components/popups/countdown';

Enzyme.configure({ adapter: new Adapter() });

describe('CountDown Tests', () => {
  let wrapper;
  const spy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    time: 3,
    title: 'Countdown',
    language: 'en',
    onComplete: () => { spy(); },
  };

  beforeEach(() => {
    wrapper = shallow(<Countdown store={store} {...props} />);

    expect(wrapper.state('timer')).toEqual(3);
    expect(wrapper.state('show')).toEqual(true);
  });

  it('should have proptypes', () => {
    const actualValue = Countdown.propTypes;

    const expectedValue = {
      time: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      onComplete: PropTypes.func.isRequired,
      language: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should hide the dialog', () => {
    wrapper.find(Dialog).simulate('hide');

    expect(wrapper.state('show')).toEqual(false);
  });

  it('should count down to zero', () => {
    const clock = sinon.useFakeTimers();

    wrapper.instance().countdown();
    clock.tick(1000);

    expect(wrapper.state('timer')).toEqual(2);
    expect(wrapper.state('show')).toEqual(true);
    expect(spy.calledOnce).toEqual(false);

    clock.tick(1000);

    expect(wrapper.state('timer')).toEqual(1);
    expect(wrapper.state('show')).toEqual(true);
    expect(spy.calledOnce).toEqual(false);

    clock.tick(1000);

    expect(wrapper.state('timer')).toEqual(0);
    expect(wrapper.state('show')).toEqual(false);
    expect(spy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
