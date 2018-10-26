import PropTypes from 'prop-types';
import MonthlyResults from '../../src/components/monthlyResults';

describe('MonthlyResults Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = MonthlyResults.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool,
      month: PropTypes.number,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
