import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import PressureRecPanel from '../../src/components/pressureRecPanel';

describe('PressureRecPanel Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = PressureRecPanel.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      maxAngle: PropTypes.number,
      reduceWeight: PropTypes.bool.isRequired,
      tiltFrequencyWeight: PropTypes.number.isRequired,
      tiltLengthWeight: PropTypes.number.isRequired,
      tiltAngleWeight: PropTypes.number.isRequired,
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
});
