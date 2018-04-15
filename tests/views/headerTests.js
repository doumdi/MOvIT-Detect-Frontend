import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Header from '../../src/views/header';

describe('Header Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = Header.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      profile: PropTypes.string,
      changeLanguage: PropTypes.func,
      changeProfile: PropTypes.func,
      changeToken: PropTypes.func,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
