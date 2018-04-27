/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Footer from '../../src/views/footer';

describe('Footer Tests', () => {
  it('should not have proptypes', function () {
    // Actual value
    const actualValue = Footer.propTypes;

    // Expected value
    const expectedValue = undefined;

    // Test
    expect(actualValue).toEqual(expectedValue);
  });
});
