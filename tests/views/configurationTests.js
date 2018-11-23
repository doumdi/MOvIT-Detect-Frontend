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
import toJson from 'enzyme-to-json';
import { URL } from '../../src/redux/applicationReducer';
import Configuration from '../../src/views/configuration';

Enzyme.configure({ adapter: new Adapter() });

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

  it('should load the data', async () => {
    await wrapper.instance().load();

    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should match the snapshot', () => {
    wrapper.setState({ isLoaded: true });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
