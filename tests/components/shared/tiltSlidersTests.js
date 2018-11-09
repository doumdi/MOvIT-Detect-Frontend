/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TiltSliders from '../../../src/components/shared/tiltSliders';

Enzyme.configure({ adapter: new Adapter() });

describe('TiltSliders Tests', () => {
  const frequencyChangeSpy = sinon.spy();
  const durationChangeSpy = sinon.spy();
  const angleChangeSpy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    tiltFrequecy: 60,
    tiltLength: 30,
    tiltAngle: 15,
    maxAngle: 45,
    onFrequencyChange: () => { frequencyChangeSpy(); },
    onLengthChange: () => { durationChangeSpy(); },
    onAngleChange: () => { angleChangeSpy(); },
  };

  beforeEach(() => {
    frequencyChangeSpy.resetHistory();
    durationChangeSpy.resetHistory();
    angleChangeSpy.resetHistory();
  });

  it('should have proptypes', () => {
    const actualValue = TiltSliders.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      tiltFrequecy: PropTypes.number,
      tiltLength: PropTypes.number,
      tiltAngle: PropTypes.number,
      maxAngle: PropTypes.number,
      onFrequencyChange: PropTypes.func.isRequired,
      onLengthChange: PropTypes.func.isRequired,
      onAngleChange: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onFrequencyChange when simulating a change event on the frequency slider', () => {
    const wrapper = shallow(<TiltSliders store={store} {...props} />).dive();

    wrapper.find('#frequency-slider').simulate('change');

    expect(frequencyChangeSpy.calledOnce).toEqual(true);
  });

  it('should trigger onLengthChange when simulating a change event on the duration slider', () => {
    const wrapper = shallow(<TiltSliders store={store} {...props} />).dive();

    wrapper.find('#duration-slider').simulate('change');

    expect(durationChangeSpy.calledOnce).toEqual(true);
  });

  it('should trigger onAngleChange when simulating a change event on the angle slider', () => {
    const wrapper = shallow(<TiltSliders store={store} {...props} />).dive();

    wrapper.find('#angle-slider').simulate('change');

    expect(angleChangeSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<TiltSliders store={store} {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
