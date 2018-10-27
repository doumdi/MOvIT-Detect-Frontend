import PropTypes from 'prop-types';
import Graphic from '../../src/views/graphic';

describe('Graphic Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Graphic.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
