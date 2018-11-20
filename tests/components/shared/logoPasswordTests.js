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
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import LogoPassword from '../../../src/components/shared/logoPassword';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoPassword Tests', () => {
  let wrapper;
  const spy = sinon.spy();
  const props = {
    value: 20,
    iconClass: 'fa fa-id-card',
    placeHolder: 'test',
    onChange: (value) => { spy(value); },
    onKeyPress: (value) => { spy(value); },
  };

  beforeEach(() => {
    spy.resetHistory();
    wrapper = shallow(<LogoPassword {...props} />);
  });

  it('should have proptypes', () => {
    const actualValue = LogoPassword.propTypes;

    const expectedValue = {
      placeHolder: PropTypes.string.isRequired,
      iconClass: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onKeyPress: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should call onChange when editing the password field', () => {
    wrapper.find('#password').simulate('change', { target: { value: '20' } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('20');
  });

  it('should call onKeyPress when simulating a keypress on the password field', () => {
    wrapper.find('#password').simulate('keyPress', 'test');

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('test');
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
