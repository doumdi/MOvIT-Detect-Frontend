import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import LogoText from '../../src/components/logoText';


Enzyme.configure({ adapter: new Adapter() });

describe('LogoText Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    value: 'test',
    language: 'en',
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<LogoText store={store} {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
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
