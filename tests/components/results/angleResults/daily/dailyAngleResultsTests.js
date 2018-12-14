/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import DailyAngleResults from '../../../../../src/components/results/angleResults/daily/dailyAngleResults';
import { OFFSET, URL } from '../../../../../src/redux/applicationReducer';


Enzyme.configure({ adapter: new Adapter() });

describe('DailyAngleResults Tests', () => {
  const date = 1517720400000;
  let wrapper;
  const response = [0.34, 0.56];
  function initializeMockAdapter() {
    const mock = new MockAdapter(axios);

    mock.onGet(`${URL}dailySlideProgress?Day=${+date}&Offset=${OFFSET}`).reply(200, response);
  }

  const initialState = { applicationReducer: { language: 'en' }, recommendationReducer: {} };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date,
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<DailyAngleResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = DailyAngleResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should update date', () => {
    wrapper.instance().componentWillReceiveProps({ date: 1517720400001 });

    expect(wrapper.state('date')).toEqual(1517720400001);
  });

  it('should get the day data', async () => {
    await wrapper.instance().getDailySlidingProgress(date);

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
    expect(wrapper.state('daySildeRest')).toEqual(response[0] * 100);
    expect(wrapper.state('daySildeMoving')).toEqual(response[1] * 100);
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

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
