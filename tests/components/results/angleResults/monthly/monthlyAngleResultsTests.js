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
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import axios from 'axios';
import MonthlyAngleResults from '../../../../../src/components/results/angleResults/monthly/monthlyAngleResults';
import { OFFSET, URL } from '../../../../../src/redux/applicationReducer';


Enzyme.configure({ adapter: new Adapter() });

const month = '1';

describe('MonthlyAngleResults Tests', () => {
  let wrapper;

  const initialState = {
    applicationReducer: { language: 'en' },
    recommendationReducer: { reduceSlidingRest: true },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    month,
  };

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

    mock.onGet(`${URL}monthlySlideProgress?Day=${+date}&Offset=${OFFSET}`).reply(200, response);
  }

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<MonthlyAngleResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = MonthlyAngleResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should update month', () => {
    wrapper.instance().componentWillReceiveProps({ month: '4' });

    expect(wrapper.state('month')).toEqual('4');
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
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
