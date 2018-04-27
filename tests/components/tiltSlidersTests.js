/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import TiltSliders from '../../src/components/tiltSliders';

describe('TiltSliders Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = TiltSliders.WrappedComponent.propTypes;

    // Expected value
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

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
