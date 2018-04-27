/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import PressureCenter from '../../src/components/pressureCenter';

describe('PressureCenter Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = PressureCenter.propTypes;

    // Expected value
    const expectedValue = {
      title: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
