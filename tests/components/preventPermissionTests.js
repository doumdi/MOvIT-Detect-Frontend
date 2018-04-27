/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import PreventPermission from '../../src/components/preventPermission';

describe('PreventPermission Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = PreventPermission.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      permission: PropTypes.bool.isRequired,
      permissionTitle: PropTypes.string.isRequired,
      period: PropTypes.string,
      onPermissionChange: PropTypes.func.isRequired,
      onPeriodChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
