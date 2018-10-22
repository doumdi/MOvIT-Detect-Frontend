import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import LogoText from '../../src/components/logoText';


Enzyme.configure({ adapter: new Adapter() });

describe('LogoText Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const spy = sinon.spy();
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    value: 'test',
    iconClass: 'fa fa-id-card',
    placeHolder: 'test',
    onChange: (value) => { spy(value); },
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
    const wrapper = shallow(<LogoText store={store} {...props} />);
    expect(wrapper.find('#logoText').props().value).toEqual('test');
  });

  it('input calls the method onChange with the right value', () => {
    const wrapper = shallow(<LogoText store={store} {...props} />);
    wrapper.find('#logoText').simulate('change', { target: { value: 'testing' } });
    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('testing');
  });
});
