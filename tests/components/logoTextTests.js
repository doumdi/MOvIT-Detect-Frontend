import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import LogoText from '../../src/components/logoText';

describe('LogoText Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = LogoText.propTypes;

    // Expected value
    const expectedValue = {
      placeHolder: PropTypes.string.isRequired,
      iconClass: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
