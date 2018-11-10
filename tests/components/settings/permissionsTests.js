/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Permissions from '../../../src/components/settings/permissions';
import PropTypes from 'prop-types';

describe('Permissions Tests', () => {
  it('should have proptypes', () => {
    const actualValue = Permissions.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired,
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

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
