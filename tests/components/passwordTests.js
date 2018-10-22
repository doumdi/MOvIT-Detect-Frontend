import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Password from '../../src/components/password';

describe('Password Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Password.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      failed: PropTypes.bool.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
