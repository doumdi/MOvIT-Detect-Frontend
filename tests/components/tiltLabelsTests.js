import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import TiltLabels from '../../src/components/tiltLabels';

describe('TiltLabels Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = TiltLabels.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      tiltFrequecy: PropTypes.number,
      tiltLength: PropTypes.number,
      tiltAngle: PropTypes.number,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
