import PropTypes from 'prop-types';
import DailyResults from '../../src/components/dailyResults';

describe('DailyResults Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = DailyResults.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      reduceWeight: PropTypes.bool.isRequired,
      reduceSlidingMoving: PropTypes.bool.isRequired,
      reduceSlidingRest: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date),
      header: PropTypes.object,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
