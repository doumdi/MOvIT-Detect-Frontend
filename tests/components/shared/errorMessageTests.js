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
import ErrorMessage from '../../../src/components/shared/errorMessage';

Enzyme.configure({ adapter: new Adapter() });

describe('ErrorMessage Tests', () => {
  const initialState = {
    applicationReducer: { language: 'en' },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  it('should have proptypes', () => {
    const actualValue = ErrorMessage.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<ErrorMessage store={store} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
