import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import GoalProgress from '../../src/components/goalProgress';

describe('GoalProgress Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = GoalProgress.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.number,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
