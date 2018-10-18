import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import LogoText from '../../src/components/logoText';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoText Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = LogoText.propTypes;

    // Expected value
    const expectedValue = {
      placeHolder: PropTypes.string.isRequired,
      iconClass: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('input prints the right value', () => {
    const value = 'test';
    const comp = shallow(
      <LogoText
        iconClass="fa fa-id-card"
        placeHolder="test"
        value={value}
        onChange={() => {}}
      />,
    );
    expect(comp.find('#logoText').props().value).toEqual(value);
  });

  it('input calls the method onChange with the right value', () => {
    let value = '';
    const change = (text) => { value = text; };
    const comp = shallow(
      <LogoText
        iconClass="fa fa-id-card"
        placeHolder="test"
        value={value}
        onChange={change}
      />,
    );
    comp.find('#logoText').simulate('change', { target: { value: 'test' } });
    expect(value).toEqual('test');
  });

});
