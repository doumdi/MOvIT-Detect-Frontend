/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import LogoText from '../../../src/components/shared/logoText';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoText Tests', () => {
  const spy = sinon.spy();
  const props = {
    value: 'test',
    iconClass: 'fa fa-id-card',
    placeHolder: 'test',
    onChange: (value) => { spy(value); },
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<LogoText {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    const actualValue = LogoText.propTypes;

    const expectedValue = {
      placeHolder: PropTypes.string.isRequired,
      iconClass: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('input prints the right value', () => {
    const wrapper = shallow(<LogoText {...props} />);

    expect(wrapper.find('#logoText').props().value).toEqual('test');
  });

  it('input calls the method onChange with the right value', () => {
    const wrapper = shallow(<LogoText {...props} />);

    wrapper.find('#logoText').simulate('change', { target: { value: 'testing' } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('testing');
  });
});
