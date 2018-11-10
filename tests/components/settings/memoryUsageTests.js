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
import { URL } from '../../../src/redux/applicationReducer';
import MemoryUsage from '../../../src/components/settings/memoryUsage';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const reponse = {
    total: 8000,
    used: 2000,
  };

  mock.onPost().reply(200);
  mock.onGet(`${URL}memory`).reply(200, reponse);
}

describe('MemoryUsage Tests', () => {
  let wrapper;
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};
  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<MemoryUsage store={store} {...props} />).dive();

    expect(wrapper.state('total')).toEqual(0);
    expect(wrapper.state('used')).toEqual(0);
  });

  it('should have proptypes', () => {
    const actualValue = MemoryUsage.WrappedComponent.propTypes;

    const expectedValue = {
      header: PropTypes.object,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should set the state when loading the component', async () => {
    await wrapper.instance().load();

    expect(wrapper.state('total')).toEqual(8000);
    expect(wrapper.state('used')).toEqual(2000);
  });

  it('should get the memory usage', async () => {
    const response = await wrapper.instance().getMemoryUsage();
    const expectedResponse = {
      total: 8000,
      used: 2000,
    };

    expect(response).toEqual(expectedResponse);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
