/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Graphic from '../../src/views/graphic';

describe('Graphic Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = Graphic.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
