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
import ModuleStatus from '../../../src/components/settings/moduleStatus';

Enzyme.configure({ adapter: new Adapter() });

describe('Module Status Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    hasErrors: false,
  };

  it('should have proptypes', () => {
    const actualValue = ModuleStatus.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      moduleStatus: PropTypes.object.isRequired,
      hasErrors: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<ModuleStatus store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
