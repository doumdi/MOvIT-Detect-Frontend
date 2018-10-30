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
import LogoNumber from '../../src/components/logoNumber';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoNumber Tests', () => {
  const spy = sinon.spy();
  const props = {
    value: 20,
    iconClass: 'fa fa-id-card',
    placeHolder: 'test',
    onChange: (value) => { spy(value); },
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<LogoNumber {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    const actualValue = LogoNumber.propTypes;

    const expectedValue = {
      iconClass: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('input prints the right value', () => {
    const wrapper = shallow(<LogoNumber {...props} />);

    expect(wrapper.find('#logoNumber').props().value).toEqual(20);
  });

  it('input calls the method onChange with the right value', () => {
    const wrapper = shallow(<LogoNumber {...props} />);

    wrapper.find('#logoNumber').simulate('change', { target: { value: 20 } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(20);
  });
});
