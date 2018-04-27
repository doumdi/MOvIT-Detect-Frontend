/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import OtherRecommandation from '../../src/components/otherRecommendation';

describe('OtherRecommandation Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = OtherRecommandation.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      recTitle: PropTypes.string,
      value: PropTypes.string,
      onChangeActive: PropTypes.func.isRequired,
      onChangeRecTitle: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
