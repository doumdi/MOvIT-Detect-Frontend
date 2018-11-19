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
import MonthlyPressureResults from '../../../../../src/components/results/pressureResults/monthly/monthlyPressureResults';


Enzyme.configure({ adapter: new Adapter() });

describe('MonthlyPressureResults Tests', () => {
  const MONTH = '2';
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
    month: MONTH,
  };

  it('should have proptypes', () => {
    const actualValue = MonthlyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      header: PropTypes.object,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should update month', () => {
    const wrapper = shallow(<MonthlyPressureResults store={store} {...props} />).dive();
    wrapper.instance().componentWillReceiveProps({ month: '4' });

    expect(wrapper.state('month')).toEqual('4');
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<MonthlyPressureResults store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
