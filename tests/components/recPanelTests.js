import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import RecPanel from '../../src/components/recPanel';

describe('RecPanel Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = RecPanel.propTypes;

    // Expected value
    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
