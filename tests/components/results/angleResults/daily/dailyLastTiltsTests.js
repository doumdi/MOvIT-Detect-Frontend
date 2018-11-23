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
import DailyLastTilts from '../../../../../src/components/results/angleResults/daily/dailyLastTilts';
import { OFFSET, URL } from '../../../../../src/redux/applicationReducer';

Enzyme.configure({ adapter: new Adapter() });

const date = 1517720400000;
const response = [
  { index: 0, timestamp: 1542819600000 },
  { index: 1, timestamp: 1542823200000 },
  { index: 2, timestamp: 1542826800000 },
  { index: 3, timestamp: 1542830400000 },
  { index: 4, timestamp: 1542834000000 },
];

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);

  mock.onGet(`${URL}lastTilts?Day=${+date},offset=${OFFSET},count=5`).reply(200, response);
}

describe('DailyLastTilts Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { header: '', language: 'FR' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date,
    header: {},
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<DailyLastTilts store={store} {...props} />).dive();

    expect(wrapper.state('date')).toEqual(date);
    expect(wrapper.state('data')).toEqual(null);
    expect(wrapper.state('isLoaded')).toEqual(false);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = DailyLastTilts.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the day data when receiving new props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getData');

    wrapper.setProps({ date: 123456 });

    expect(wrapper.state('date')).toEqual(123456);
    expect(spy.calledOnce).toEqual(true);
  });

  it('should do nothing when receiving matching props', () => {
    const spy = sinon.spy(wrapper.instance(), 'getData');

    wrapper.setProps({ date });

    expect(wrapper.state('date')).toEqual(date);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the day data', async () => {
    await wrapper.instance().getData(date);

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('data')).toEqual(response);
  });

  it('should match the snapshot', () => {
    wrapper.setState({ isLoaded: true, hasErrors: false });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
