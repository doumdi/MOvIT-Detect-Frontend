import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import PressureRecPanel from '../../../src/components/goal/pressureRecPanel';

Enzyme.configure({ adapter: new Adapter() });

describe('PressureRecPanel Tests', () => {
  let wrapper = {};
  const initialState = {
    applicationReducer: { language: 'en' },
    recommendationReducer: { reduceWeight: true },
    configurationReducer: { maxAngle: 90 },
    goalReducer: {
      tiltFrequencyGoal: 900,
      tiltLengthGoal: 60,
      tiltAngleGoal: 40,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow(<PressureRecPanel store={store} />).dive();

    expect(wrapper.state('modifieGoal')).toEqual(false);
    expect(wrapper.state('maxSliderAngle')).toEqual(90);
  });


  it('should have proptypes', () => {
    // Actual value
    const actualValue = PressureRecPanel.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      maxAngle: PropTypes.number,
      reduceWeight: PropTypes.bool.isRequired,
      tiltFrequencyGoal: PropTypes.number.isRequired,
      tiltLengthGoal: PropTypes.number.isRequired,
      tiltAngleGoal: PropTypes.number.isRequired,
      changeTiltFrequencyGoal: PropTypes.func.isRequired,
      changeTiltLengthGoal: PropTypes.func.isRequired,
      changeTiltAngleGoal: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should display labels and not save anything when we\'re not modifying', () => {
    const spy = sinon.spy(wrapper.instance(), 'save');
    wrapper.instance().toggleEditing();

    expect(wrapper.state('modifieGoal')).toEqual(true);
    expect(spy.calledOnce).toEqual(false);
    expect(toJson(wrapper)).toMatchSnapshot(); // snapshot with sliders
  });

  it('should hide labels and save new data when we\'re modifying', () => {
    const spy = sinon.spy(wrapper.instance(), 'save');
    wrapper.setState({ modifieGoal: true });
    wrapper.instance().toggleEditing();

    expect(wrapper.state('modifieGoal')).toEqual(false);
    expect(spy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
