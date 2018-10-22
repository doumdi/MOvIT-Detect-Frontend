import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Configuration from '../../src/views/configuration';

describe('Configuration Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Configuration.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      userName: PropTypes.string.isRequired,
      changeUserName: PropTypes.func.isRequired,
      language: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
      changeUserID: PropTypes.func.isRequired,
      maxAngle: PropTypes.number,
      changeMaxAngle: PropTypes.func.isRequired,
      userWeight: PropTypes.number,
      changeUserWeight: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
