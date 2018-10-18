import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import LogoNumber from '../../src/components/logoNumber';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoNumber Tests', () => {
  it('should have proptypes', function () {
    // Actual value
    const actualValue = LogoNumber.propTypes;

    // Expected value
    const expectedValue = {
      iconClass: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('input prints the right value', () => {
    const value = 20;
    const comp = shallow(
      <LogoNumber
        iconClass="fa fa-id-card"
        placeHolder="test"
        value={value}
        onChange={() => {}}
      />,
    );
    expect(comp.find('#logoNumber').props().value).toEqual(value);
  });

  it('input calls the method onChange with the right value', () => {
    let value = 0;
    const change = (text) => { value = text; };
    const comp = shallow(
      <LogoNumber
        iconClass="fa fa-id-card"
        placeHolder="test"
        value={value}
        onChange={change}
      />,
    );
    comp.find('#logoNumber').simulate('change', { target: { value: 20 } });
    expect(value).toEqual(20);
  });
});
