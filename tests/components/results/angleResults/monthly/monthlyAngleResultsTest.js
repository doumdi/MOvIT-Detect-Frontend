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
import MonthlyAngleResults from '../../../../../src/components/results/angleResults/monthly/monthlyAngleResults';


Enzyme.configure({ adapter: new Adapter() });

describe('MonthlyAngleResults Tests', () => {
  const MONTH = '2';
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    month: MONTH,
  };

  it('should have proptypes', () => {
    const actualValue = MonthlyAngleResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should update month', () => {
    const wrapper = shallow(<MonthlyAngleResults store={store} {...props} />).dive();
    wrapper.instance().componentWillReceiveProps({ month: '4' });

    expect(wrapper.state('month')).toEqual('4');
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<MonthlyAngleResults store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
