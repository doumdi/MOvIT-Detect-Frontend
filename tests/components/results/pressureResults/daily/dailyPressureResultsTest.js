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
import { URL } from '../../../../../src/redux/applicationReducer';
import DailyPressureResults from '../../../../../src/components/results/pressureResults/daily/dailyPressureResults';

Enzyme.configure({ adapter: new Adapter() });
const date = 1517720400000;
const response = [0.34, 0.56];

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);

  mock.onGet(`${URL}dailySlideProgress?Day=${+date},offset=0`).reply(200, response);
}

describe('DailyPressureResults Tests', () => {
  let wrapper;

  const initialState = {
    applicationReducer: { language: 'FR' },
    recommendationReducer: {
      reduceWeight: true,
      reduceSlidingRest: true,
      reduceSlidingMoving: true,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date,
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<DailyPressureResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = DailyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      header: PropTypes.object,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the day data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getDailySlidingProgress');

    wrapper.setProps({ date: 123456 });

    expect(wrapper.state('date')).toEqual(123456);
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getDailySlidingProgress');

    wrapper.setProps({ date });

    expect(wrapper.state('date')).toEqual(date);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the day data', async () => {
    await wrapper.instance().getDailySlidingProgress(date);

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('daySildeRest')).toEqual(response[0] * 100);
    expect(wrapper.state('daySildeMoving')).toEqual(response[1] * 100);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
