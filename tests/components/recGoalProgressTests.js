/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import RecGoalProgress from '../../src/components/recGoalProgress';

describe('RecGoalProgress Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = RecGoalProgress.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      goalValue: PropTypes.number,
      recValue: PropTypes.number,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
