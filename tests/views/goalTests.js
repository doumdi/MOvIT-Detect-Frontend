import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Goal from '../../src/views/goal';

describe('Goal Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Goal.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      swellingRecommendation: PropTypes.string,
      painRecommendation: PropTypes.string,
      restRecommendation: PropTypes.string,
      transferRecommendation: PropTypes.string,
      comfortRecommendation: PropTypes.string,
      otherRecommendations: PropTypes.string,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool.isRequired,
      tiltAngleMoving: PropTypes.number.isRequired,
      tiltAngleRest: PropTypes.number.isRequired,
      allowRest: PropTypes.bool.isRequired,
      easeTransfers: PropTypes.bool.isRequired,
      improveComfort: PropTypes.bool.isRequired,
      other: PropTypes.bool.isRequired,
      otherRecommendationsTitle: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool.isRequired,
      reduceSwelling: PropTypes.bool.isRequired,
      reducePain: PropTypes.bool.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
