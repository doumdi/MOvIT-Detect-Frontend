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

import TiltLabels from '../../../src/components/goal/tiltLabels';

Enzyme.configure({ adapter: new Adapter() });

describe('TiltLabels Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    title: 'This is a title',
    tiltFrequecy: 60,
    tiltLength: 30,
    tiltAngle: 15,
    modifiable: true,
  };

  it('should have proptypes', () => {
    const actualValue = TiltLabels.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      tiltFrequecy: PropTypes.number,
      tiltLength: PropTypes.number,
      tiltAngle: PropTypes.number,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<TiltLabels store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
