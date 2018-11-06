/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import GoalProgress from '../../src/components/goalProgress';

Enzyme.configure({ adapter: new Adapter() });

describe('GoalProgress Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    condition: true,
    title: 'This is a test',
    value: 10,
  };

  it('should have proptypes', () => {
    const actualValue = GoalProgress.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.number,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<GoalProgress store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
