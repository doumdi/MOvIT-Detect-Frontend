import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import Password from '../../src/components/password';

Enzyme.configure({ adapter: new Adapter() });

describe('Password Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const submitSpy = sinon.spy();
  const forgotPasswordSpy = sinon.spy();
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    failed: false,
    onSubmit: (value) => { submitSpy(value); },
    onForgotPassword: () => { forgotPasswordSpy(); },
  };

  beforeEach(() => {
    submitSpy.resetHistory();
    forgotPasswordSpy.resetHistory();
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<Password store={store} {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    // Actual value
    const actualValue = Password.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      failed: PropTypes.bool.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should call onSumbit on login button pressed', () => {
    const wrapper = shallow(<Password store={store} {...props} />).dive();
    wrapper.setState({ password: 'test' });
    wrapper.find('#loginBtn').simulate('click');
    expect(submitSpy.calledOnce).toEqual(true);
    expect(submitSpy.getCalls()[0].args[0]).toEqual('test');
  });

  it('should change the states password and reset failed boolean when password field is changed', () => {
    const wrapper = shallow(<Password store={store} {...props} />).dive();
    wrapper.setState({ password: 'test', failed: true });
    wrapper.find('#password').simulate('change', { target: { value: 'value' } });
    expect(wrapper.state('password')).toEqual('value');
    expect(wrapper.state('failed')).toEqual(false);
  });

  it('should call reset password method', () => {
    const wrapper = shallow(<Password store={store} {...props} />).dive();
    wrapper.find('#forgotPasswordBtn').simulate('click');
    expect(forgotPasswordSpy.calledOnce).toEqual(true);
  });

  it('should macth snapshot when password failed', () => {
    const failedProps = {
      failed: true,
      onSubmit: (value) => { submitSpy(value); },
      onForgotPassword: () => { forgotPasswordSpy(); },
    };
    const wrapper = shallow(<Password store={store} {...failedProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
