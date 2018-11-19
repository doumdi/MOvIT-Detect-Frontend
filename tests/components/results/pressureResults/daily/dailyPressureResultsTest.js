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
import configureMockStore from 'redux-mock-store';
import DailyPressureResults from '../../../../../src/components/results/pressureResults/daily/dailyPressureResults';


Enzyme.configure({ adapter: new Adapter() });

describe('DailyPressureResults Tests', () => {
  const DATE = 1517720400000;
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
    date: DATE,
  };

  it('should have proptypes', () => {
    const actualValue = DailyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      header: PropTypes.object,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should update date', () => {
    const wrapper = shallow(<DailyPressureResults store={store} {...props} />).dive();
    wrapper.instance().componentWillReceiveProps({ date: 1517720400001 });

    expect(wrapper.state('date')).toEqual(1517720400001);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<DailyPressureResults store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
