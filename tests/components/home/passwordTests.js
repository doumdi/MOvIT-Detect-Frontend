import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Password from '../../../src/components/home/password';

Enzyme.configure({ adapter: new Adapter() });

describe('Password Tests', () => {
  let wrapper;
  const initialState = {
    applicationReducer: { language: 'en' },
  };
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

    wrapper = mount(<Password store={store} {...props} />);
  });

  it('should have proptypes', () => {
    const actualValue = Password.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
      failed: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should call onSumbit on login button pressed', () => {
    wrapper.setState({ password: 'test' });

    wrapper.find('#loginBtn').simulate('click');

    expect(submitSpy.calledOnce).toEqual(true);
  });

  it('should call onSumbit on login enter pressed', () => {
    wrapper.setState({ password: 'test' });

    wrapper.find('#password').simulate('keyPress', { keyCode: 13, key: 'Enter' });

    expect(submitSpy.calledOnce).toEqual(true);
  });

  it('should call reset password method', () => {
    wrapper.find('#forgotPasswordBtn').simulate('click');

    expect(forgotPasswordSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should macth snapshot when password failed', () => {
    const failedProps = {
      failed: true,
      onSubmit: (value) => { submitSpy(value); },
      onForgotPassword: () => { forgotPasswordSpy(); },
    };
    const passwordFailedWrapper = mount(<Password store={store} {...failedProps} />);

    expect(toJson(passwordFailedWrapper)).toMatchSnapshot();
  });
});
