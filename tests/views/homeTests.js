/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { URL } from '../../src/redux/applicationReducer';
import Home from '../../src/views/home';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const response = {
    token: '123456',
  };

  mock.onGet(`${URL}login`).reply(200);
  mock.onPost(`${URL}login`).reply(200, response);
}

describe('Home Tests', () => {
  let wrapper;
  const initialState = {
    applicationReducer: {
      language: 'FR',
      profile: 'user',
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    history: [],
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<Home store={store} {...props} />).dive();

    expect(wrapper.state('user')).toEqual(null);
    expect(wrapper.state('loginFail')).toEqual(false);
  });

  it('should have proptypes', () => {
    const actualValue = Home.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      changeProfile: PropTypes.func.isRequired,
      changeToken: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      profile: PropTypes.string,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should set the loginFail to true', () => {
    wrapper.instance().loginError();

    expect(wrapper.state('loginFail')).toEqual(true);
  });

  it('should set the user to null', () => {
    wrapper.instance().clear();

    expect(wrapper.state('user')).toEqual(null);
  });

  it('should set the login profile', () => {
    const spy = sinon.spy(wrapper.instance(), 'setLoginProfile');

    wrapper.setProps({ profile: null });
    wrapper.setState({ user: 'user' });
    wrapper.find('#userButton').simulate('click');


    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('user');
    expect(wrapper.state('user')).toEqual(null);

    spy.resetHistory();
    wrapper.setState({ user: null });
    wrapper.find('#clinicianButton').simulate('click');

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('clinician');
    expect(wrapper.state('user')).toEqual('clinician');
  });

  it('should set the profile when login', async () => {
    const spy = sinon.spy(wrapper.instance(), 'setProfile');

    await wrapper.instance().login('');

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('123456');
  });

  it('should change the profile and token when setting the profile', () => {
    store.clearActions();

    wrapper.setState({ user: 'user' });
    wrapper.instance().setProfile('123456');

    const actions = store.getActions();

    expect(actions[0].type).toEqual('PROFILE');
    expect(actions[1].type).toEqual('TOKEN');

    expect(actions[0].profile).toEqual('user');
    expect(actions[1].token).toEqual('123456');
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
