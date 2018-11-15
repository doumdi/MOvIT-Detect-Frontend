/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import ModuleStatus from '../../../src/components/settings/moduleStatus';

Enzyme.configure({ adapter: new Adapter() });

describe('Module Status Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
  };

  it('should have proptypes', () => {
    const actualValue = ModuleStatus.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<ModuleStatus store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
