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
import DailyAngleResults from '../../../../../src/components/results/angleResults/daily/dailyAngleResults';


Enzyme.configure({ adapter: new Adapter() });

describe('DailyAngleResults Tests', () => {
  const DATE = 1517720400000;
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date: DATE,
  };

  it('should have proptypes', () => {
    const actualValue = DailyAngleResults.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<DailyAngleResults store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
