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
import Configuration from '../../src/views/configuration';

Enzyme.configure({ adapter: new Adapter() });

const TIMEOUT = 1000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const response = {
    userName: 'Benjamin Roy',
    userID: 1,
    maxAngle: 90,
    userWeight: 10,
  };

  mock.onGet(`${URL}configuration`).reply(200, response);
}

describe('Configuration Tests', () => {
  let wrapper;

  const initialState = {
    applicationReducer: {
      header: '', language: 'FR',
    },
    configurationReducer: {
      userName: 'Benjamin',
      userID: 0,
      userWeight: 10,
      maxAngle: 45,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<Configuration store={store} {...props} />).dive();
    wrapper.setState({ isLoaded: true, hasErrors: false });

    const spy = sinon.spy(wrapper.instance(), 'load');

    setTimeout(() => {
      expect(spy.calledOnce).toEqual(true);
      expect(wrapper.state('isLoaded')).toEqual(true);
      expect(wrapper.state('hasErrors')).toEqual(false);
    }, TIMEOUT);
  });

  it('should have proptypes', () => {
    const actualValue = Configuration.WrappedComponent.propTypes;

    const expectedValue = {
      history: PropTypes.object.isRequired,
      userName: PropTypes.string.isRequired,
      changeUserName: PropTypes.func.isRequired,
      language: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
      changeUserID: PropTypes.func.isRequired,
      maxAngle: PropTypes.number,
      changeMaxAngle: PropTypes.func.isRequired,
      userWeight: PropTypes.number,
      changeUserWeight: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should map the data with the response', async () => {
    const spy = sinon.spy(wrapper.instance(), 'mapData');

    await wrapper.instance().load();

    expect(spy.getCalls()[0].args[0]).toEqual({
      userName: 'Benjamin Roy',
      userID: 1,
      maxAngle: 90,
      userWeight: 10,
    });
    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should map the goal data', () => {
    const response = {
      userName: 'Benjamin Roy',
      userID: 1,
      maxAngle: 90,
      userWeight: 10,
    };

    store.clearActions();

    wrapper.instance().mapData(response);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('USER_NAME');
    expect(actions[1].type).toEqual('USER_ID');
    expect(actions[2].type).toEqual('MAX_ANGLE');
    expect(actions[3].type).toEqual('USER_WEIGHT');
    expect(actions[0].userName).toEqual('Benjamin Roy');
    expect(actions[1].userID).toEqual(1);
    expect(actions[2].maxAngle).toEqual(90);
    expect(actions[3].userWeight).toEqual(10);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
