import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Parameter from '../../src/views/parameter';

describe('Parameter Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Parameter.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      changeDataAgreement: PropTypes.func,
      dataAgreement: PropTypes.bool,
      dataDisagreePeriod: PropTypes.string,
      changeLightAgreement: PropTypes.func,
      lightAgreement: PropTypes.bool,
      lightDisagreePeriod: PropTypes.string,
      changeDataDisagreePeriod: PropTypes.func,
      changeLightDisagreePeriod: PropTypes.func,
      changeNotificationDisagreePeriod: PropTypes.func,
      changeNotificationAgreement: PropTypes.func,
      notificationAgreement: PropTypes.bool,
      notificationDisagreePeriod: PropTypes.string,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
