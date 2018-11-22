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
import MonthlyPressureResults from '../../../../../src/components/results/pressureResults/monthly/monthlyPressureResults';

Enzyme.configure({ adapter: new Adapter() });

const month = '1';
const response = {
  1: [
    0.7,
    0.20,
  ],
  2: [
    0.45,
    0.25,
  ],
};

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const date = new Date(new Date().getFullYear(), month, 1);

  mock.onGet(`${URL}monthlySlideProgress?Day=${+date},offset=${OFFSET}`).reply(200, response);
}

describe('MonthlyPressureResults Tests', () => {
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
    month,
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<MonthlyPressureResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = MonthlyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      header: PropTypes.object,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the month data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getMonthlySlidingProgress');

    wrapper.setProps({ month: '2' });

    expect(wrapper.state('month')).toEqual('2');
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getMonthlySlidingProgress');

    wrapper.setProps({ month });

    expect(wrapper.state('month')).toEqual(month);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the month data', async () => {
    const spy = sinon.spy(wrapper.instance(), 'loadMonthlySlidingData');

    await wrapper.instance().getMonthlySlidingProgress(month);

    expect(spy.getCalls()[0].args[0]).toEqual(response);
    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('monthSlideLabels')).toEqual(['1', '2']);
    expect(wrapper.state('monthSildeRest')).toEqual([response[1][0] * 100, response[2][0] * 100]);
    expect(wrapper.state('monthSildeMoving')).toEqual([response[1][1] * 100, response[2][1] * 100]);
  });

  it('should match the snapshot', () => {
    wrapper.setState({
      isLoaded: true,
      hasErrors: false,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
