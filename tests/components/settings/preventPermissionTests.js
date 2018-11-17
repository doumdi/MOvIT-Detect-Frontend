/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import PreventPermission from '../../../src/components/settings/preventPermission';

Enzyme.configure({ adapter: new Adapter() });

describe('PreventPermission Tests', () => {
  let wrapper;
  const initialState = { applicationReducer: { language: 'en' } };
  const permissionChangeSpy = sinon.spy();
  const saveSpy = sinon.spy();
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    permission: false,
    permissionTitle: 'test',
    onPermissionChange: (value) => { permissionChangeSpy(value); },
    onSave: () => { saveSpy(); },
  };

  beforeEach(() => {
    permissionChangeSpy.resetHistory();
    saveSpy.resetHistory();

    wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    const actualValue = PreventPermission.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      permission: PropTypes.bool.isRequired,
      permissionTitle: PropTypes.string.isRequired,
      onPermissionChange: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should call onPermissionChange when check box is changed', () => {
    wrapper.find('#agreement').simulate('change', { checked: true });

    expect(saveSpy.calledOnce).toEqual(true);
    expect(permissionChangeSpy.calledOnce).toEqual(true);
    expect(permissionChangeSpy.getCalls()[0].args[0]).toEqual(true);
  });
});
