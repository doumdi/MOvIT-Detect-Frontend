import PropTypes from 'prop-types';
import GoalChart from '../../src/components/goalChart';

describe('GoalChart Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = GoalChart.propTypes;

    // Expected value
    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      successMessage: PropTypes.string.isRequired,
      data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
