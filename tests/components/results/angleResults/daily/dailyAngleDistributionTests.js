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
import { URL, OFFSET } from '../../../../../src/redux/applicationReducer';
import DailyAngleDistribution from '../../../../../src/components/results/angleResults/daily/dailyAngleDistribution';

Enzyme.configure({ adapter: new Adapter() });

const date = 1517720400000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const reponse = [0, 23040000, 35136000, 27648000, 0];

  mock.onGet(`${URL}oneDay?Day=${+date},offset=${OFFSET}`).reply(200, reponse);
}

describe('DailyAngleDistribution Tests', () => {
  let wrapper;

  const initialState = {
    applicationReducer: { header: '' },
    recommendationReducer: {
      reduceWeight: true,
      reduceSlidingRest: true,
      reduceSlidingMoving: true,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    reduceWeight: true,
    reduceSlidingMoving: true,
    reduceSlidingRest: true,
    date,
    header: {},
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<DailyAngleDistribution store={store} {...props} />).dive();

    expect(wrapper.state('dayData')).toEqual([]);
    expect(wrapper.state('date')).toEqual(date);
    expect(wrapper.state('isLoaded')).toEqual(false);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = DailyAngleDistribution.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      reduceWeight: PropTypes.bool.isRequired,
      reduceSlidingMoving: PropTypes.bool.isRequired,
      reduceSlidingRest: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      header: PropTypes.object.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the day data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getDayData');

    wrapper.setProps({ date: 123456 });

    expect(wrapper.state('date')).toEqual(123456);
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getDayData');

    wrapper.setProps({ date });

    expect(wrapper.state('date')).toEqual(date);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the day data', async () => {
    await wrapper.instance().getDayData(date);

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('dayData')).toEqual([0, 384, 585.6, 460.8, 0]);
  });

  it('should return the formatted time', () => {
    let time = wrapper.instance().formatTime(223);
    expect(time).toEqual('3h 43m 00s');

    time = wrapper.instance().formatTime(0.4);
    expect(time).toEqual('0h 00m 24s');

    time = wrapper.instance().formatTime(0);
    expect(time).toEqual('0h 00m 00s');
  });

  it('should match the snapshot', () => {
    wrapper.setState({ isLoaded: true, hasErrors: false });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
