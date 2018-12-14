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
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import DailyPressureResults from '../../../../../src/components/results/pressureResults/daily/dailyPressureResults';

Enzyme.configure({ adapter: new Adapter() });


describe('DailyPressureResults Tests', () => {
  const date = 1517720400000;
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
    date,
  };

  beforeEach(() => {
    wrapper = shallow(<DailyPressureResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = DailyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
