/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import MonthlyAngleDistribution from '../../../../../src/components/results/angleResults/monthly/monthlyAngleDistribution';
import PropTypes from 'prop-types';
import React from 'react';
import { URL } from '../../../../../src/redux/applicationReducer';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

const MONTH = '1';
const DATE = 1517461200000;
const RESPONSE = {
  1: [
    0,
    31680000,
    25056000,
    29376000,
    8512348,
  ],
  2: [
    0,
    27648000,
    25056000,
    33408000,
    8512348,
  ],
};

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const date = new Date(new Date().getFullYear(), MONTH, 1);

  mock.onGet(`${URL}oneMonth?Day=${+date}`).reply(200, RESPONSE);
}

describe('MonthlyAngleDistribution Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { header: '', language: 'FR' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    month: MONTH,
    header: {},
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<MonthlyAngleDistribution store={store} {...props} />).dive();
    wrapper.setState({ loading: false });

    expect(wrapper.state('angleMonthLabels')).toEqual([]);
    expect(wrapper.state('month')).toEqual(MONTH);
    expect(wrapper.state('angleChartData')).toEqual(null);
    expect(wrapper.state('angleLoading')).toEqual(true);
  });

  it('should have proptypes', () => {
    const actualValue = MonthlyAngleDistribution.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      month: PropTypes.number,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the month data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getAngleMonthData');

    wrapper.setProps({ month: '3' });

    expect(wrapper.state('month')).toEqual('3');
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getAngleMonthData');

    wrapper.setProps({ month: MONTH });

    expect(wrapper.state('month')).toEqual(MONTH);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the month data', async () => {
    await wrapper.instance().getAngleMonthData(MONTH);
    const total1 = RESPONSE[1].reduce((a, b) => a + b, 0);
    const percents1 = RESPONSE[1].map(v => (v / total1) * 100);
    const total2 = RESPONSE[2].reduce((a, b) => a + b, 0);
    const percents2 = RESPONSE[2].map(v => (v / total2) * 100);
    const expected = [percents1[1], percents2[1]];

    expect(wrapper.state('angleMonthData').fifteen).toEqual(expected);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
