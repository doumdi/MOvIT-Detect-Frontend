/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import $ from 'jquery';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import Header from '../../src/views/header';

global.$ = $;
global.$ = () => ({
  collapse: jest.fn(),
});

Enzyme.configure({ adapter: new Adapter() });

describe('Header Tests', () => {
  let wrapper;

  const initialState = {
    applicationReducer: {
      language: 'FR',
      profile: 'user',
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};

  beforeEach(() => {
    localStorage.setItem('profile', 'user');
    localStorage.setItem('token', '123456');

    store.clearActions();

    wrapper = shallow(<Header store={store} {...props} />).dive();

    const actions = store.getActions();

    expect(actions[0].type).toEqual('PROFILE');
    expect(actions[1].type).toEqual('TOKEN');
    expect(actions[0].profile).toEqual('user');
    expect(actions[1].token).toEqual('123456');
  });

  it('should have proptypes', () => {
    const actualValue = Header.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      profile: PropTypes.string,
      changeLanguage: PropTypes.func,
      changeProfile: PropTypes.func,
      changeToken: PropTypes.func,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should logout', () => {
    store.clearActions();

    wrapper.instance().logout();

    const actions = store.getActions();

    expect(actions[0].type).toEqual('PROFILE');
    expect(actions[1].type).toEqual('TOKEN');
    expect(actions[0].profile).toEqual('');
    expect(actions[1].token).toEqual('');
    expect(localStorage.getItem('profile')).toEqual('');
    expect(localStorage.getItem('token')).toEqual('');
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
