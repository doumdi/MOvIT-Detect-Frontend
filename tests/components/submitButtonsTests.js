import PropTypes from 'prop-types';
import SubmitButtons from '../../src/components/submitButtons';

describe('SubmitButtons Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = SubmitButtons.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      onSave: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
