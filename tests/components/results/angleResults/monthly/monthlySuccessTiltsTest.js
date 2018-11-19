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
import MonthlySuccessTilt from '../../../../../src/components/results/angleResults/monthly/monthlySuccessTilt';

Enzyme.configure({ adapter: new Adapter() });

const MONTH = '1';
const RESPONSE = {
  1: [
    50,
    20,
    25,
    10,
  ],
  2: [
    45,
    25,
    15,
    20,
  ],
};

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const date = new Date(new Date().getFullYear(), MONTH, 1);

  mock.onGet(`${URL}monthlySuccessfulTilts?Day=${+date},offset=0`).reply(200, RESPONSE);
}

describe('MonthlySuccessTilt Tests', () => {
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
    wrapper = shallow(<MonthlySuccessTilt store={store} {...props} />).dive();
    wrapper.setState({ loading: false });

    expect(wrapper.state('labels')).toEqual([]);
    expect(wrapper.state('month')).toEqual(MONTH);
    expect(wrapper.state('data')).toEqual(null);
    expect(wrapper.state('loading')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = MonthlySuccessTilt.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      month: PropTypes.number,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the month data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getMonthData');

    wrapper.setProps({ month: '2' });

    expect(wrapper.state('month')).toEqual('2');
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getMonthData');

    wrapper.setProps({ month: MONTH });

    expect(wrapper.state('month')).toEqual(MONTH);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the month data', async () => {
    await wrapper.instance().getMonthData(MONTH);

    expect(wrapper.state('tiltMonthData').good).toEqual([RESPONSE[1][0], RESPONSE[2][0]]);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
