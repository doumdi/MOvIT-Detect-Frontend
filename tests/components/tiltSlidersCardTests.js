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

import TiltSlidersCard from '../../src/components/tiltSlidersCard';

Enzyme.configure({ adapter: new Adapter() });

describe('TiltSlidersCard Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    tiltFrequecy: 40,
    tiltLength: 30,
    tiltAngle: 20,
    maxAngle: 45,
    title: 'This is a title',
    modifiable: true,
  };

  it('should have proptypes', () => {
    const actualValue = TiltSlidersCard.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      tiltFrequecy: PropTypes.number,
      tiltLength: PropTypes.number,
      tiltAngle: PropTypes.number,
      maxAngle: PropTypes.number,
      title: PropTypes.string,
      onFrequencyChange: PropTypes.func.isRequired,
      onLengthChange: PropTypes.func.isRequired,
      onAngleChange: PropTypes.func.isRequired,
      modifiable: PropTypes.bool,
      onModifie: PropTypes.func,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<TiltSlidersCard store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
