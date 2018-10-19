import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import LogoNumber from '../../src/components/logoNumber';

describe('LogoNumber Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = LogoNumber.propTypes;

    // Expected value
    const expectedValue = {
      iconClass: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
