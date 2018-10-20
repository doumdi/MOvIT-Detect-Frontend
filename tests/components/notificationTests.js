import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import GoalProgress from '../../src/components/notification';

describe('Notification Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = GoalProgress.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
