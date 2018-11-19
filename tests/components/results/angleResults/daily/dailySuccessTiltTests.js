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
import DailySuccessTilt from '../../../../../src/components/results/angleResults/daily/dailySuccessTilt';

Enzyme.configure({ adapter: new Adapter() });

const DATE = 1517720400000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const reponse = [25, 10, 12, 5];

  mock.onGet(`${URL}dailySuccessfulTilts?Day=${+DATE},offset=0`).reply(200, reponse);
}

describe('DailySuccessTilt Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { header: '', language: 'FR' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date: DATE,
    header: {},
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<DailySuccessTilt store={store} {...props} />).dive();
    wrapper.setState({ loading: false });

    expect(wrapper.state('dayData')).toEqual([]);
    expect(wrapper.state('date')).toEqual(DATE);
    expect(wrapper.state('data')).toEqual(null);
    expect(wrapper.state('loading')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = DailySuccessTilt.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      header: PropTypes.object.isRequired,
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

    wrapper.setProps({ date: DATE });

    expect(wrapper.state('date')).toEqual(DATE);
    expect(spy.calledOnce).toEqual(false);
  });

  it('should get the day data', async () => {
    await wrapper.instance().getData(DATE);

    expect(wrapper.state('dayData')).toEqual([25, 10, 12, 5]);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
