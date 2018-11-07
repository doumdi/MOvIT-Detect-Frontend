/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Debug from '../../src/views/debug';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe('Debug Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};

  it('should have proptypes', () => {
    const actualValue = Debug.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<Debug store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
