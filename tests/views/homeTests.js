/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Home from '../../src/views/home';

describe('Home Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = Home.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      changeProfile: PropTypes.func.isRequired,
      changeToken: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      profile: PropTypes.string,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
