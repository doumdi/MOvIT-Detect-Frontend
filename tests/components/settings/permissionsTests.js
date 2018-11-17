/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import PropTypes from 'prop-types';
import Permissions from '../../../src/components/settings/permissions';

describe('Permissions Tests', () => {
  it('should have proptypes', () => {
    const actualValue = Permissions.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      changeDataAgreement: PropTypes.func,
      dataAgreement: PropTypes.bool,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
