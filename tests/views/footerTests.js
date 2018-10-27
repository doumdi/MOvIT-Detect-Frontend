import Footer from '../../src/views/footer';

describe('Footer Tests', () => {
  it('should not have proptypes', () => {
    // Actual value
    const actualValue = Footer.propTypes;

    // Expected value
    const expectedValue = undefined;

    // Test
    expect(actualValue).toEqual(expectedValue);
  });
});
