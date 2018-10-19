import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import LogoNumber from '../../src/components/logoNumber';

Enzyme.configure({ adapter: new Adapter() });

describe('LogoNumber Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    value: 20,
    language: 'en',
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<LogoNumber store={store} {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
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
