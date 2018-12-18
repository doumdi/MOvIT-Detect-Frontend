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
import MonthlyPressureResults from '../../../../../src/components/results/pressureResults/monthly/monthlyPressureResults';


Enzyme.configure({ adapter: new Adapter() });

const month = '1';

describe('MonthlyPressureResults Tests', () => {
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
    month,
  };

  beforeEach(() => {
    wrapper = shallow(<MonthlyPressureResults store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = MonthlyPressureResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    wrapper.setState({
      isLoaded: true,
      hasErrors: false,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
