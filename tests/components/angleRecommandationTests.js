import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import AngleRecommandation from '../../src/components/angleRecommendation';

describe('AngleRecommandation Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = AngleRecommandation.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      maxAngle: PropTypes.number.isRequired,
      value: PropTypes.number,
      onChangeActive: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    };


    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
