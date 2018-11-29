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
import MonthlySuccessTilt from '../../../../../src/components/results/angleResults/monthly/monthlySuccessTilt';
import { OFFSET, URL } from '../../../../../src/redux/applicationReducer';

Enzyme.configure({ adapter: new Adapter() });

const month = '1';
const response = {
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
  const date = new Date(new Date().getFullYear(), month, 1);

  mock.onGet(`${URL}monthlySuccessfulTilts?Day=${+date}&offset=${OFFSET}`).reply(200, response);
}

describe('MonthlySuccessTilt Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { header: '', language: 'FR' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    month,
    header: {},
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<MonthlySuccessTilt store={store} {...props} />).dive();

    expect(wrapper.state('labels')).toEqual([]);
    expect(wrapper.state('month')).toEqual(month);
    expect(wrapper.state('isLoaded')).toEqual(false);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = MonthlySuccessTilt.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
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

    wrapper.setProps({ month });

    expect(wrapper.state('month')).toEqual(month);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the month data', async () => {
    await wrapper.instance().getMonthData(month);

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('tiltMonthData').good).toEqual([response[1][0], response[2][0]]);
  });

  it('should match the snapshot', () => {
    wrapper.setState({ isLoaded: true, hasErrors: false });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
