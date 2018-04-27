/**
 * @author Austin Didier Tran
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import RecGoalChart from '../../src/components/recGoalChart';

describe('RecGoalChart Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = RecGoalChart.propTypes;

    // Expected value
    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      goalTitle: PropTypes.string.isRequired,
      recTitle: PropTypes.string.isRequired,
      goalData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      recData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
