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
import MonthlySittingTime from '../../../../../src/components/results/pressureResults/monthly/monthlySittingTime';

Enzyme.configure({ adapter: new Adapter() });

const MONTH = '1';
const RESPONSE = {
  1: 696,
  2: 763,
  3: 739,
};

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const date = new Date(new Date().getFullYear(), MONTH, 1);

  mock.onGet(`${URL}sittingTime?Day=${+date},Offset=0`).reply(200, RESPONSE);
}

describe('MonthlySittingTime Tests', () => {
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
    wrapper = shallow(<MonthlySittingTime store={store} {...props} />).dive();
    wrapper.setState({ loading: false });

    expect(wrapper.state('sitMonthData')).toEqual([]);
    expect(wrapper.state('sitMonthLabels')).toEqual([]);
    expect(wrapper.state('month')).toEqual(MONTH);
    expect(wrapper.state('sitChartData')).toEqual(null);
    expect(wrapper.state('sitLoading')).toEqual(true);
  });

  it('should have proptypes', () => {
    const actualValue = MonthlySittingTime.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      month: PropTypes.number,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the month data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getSitMonthData');

    wrapper.setProps({ month: '2' });

    expect(wrapper.state('month')).toEqual('2');
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getSitMonthData');

    wrapper.setProps({ month: MONTH });

    expect(wrapper.state('month')).toEqual(MONTH);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the month data', async () => {
    await wrapper.instance().getSitMonthData(MONTH);


    expect(wrapper.state('sitMonthLabels')).toEqual(['1', '2', '3']);
    expect(wrapper.state('sitMonthData')).toEqual([(RESPONSE[1] / 60), (RESPONSE[2] / 60), (RESPONSE[3] / 60)]);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
