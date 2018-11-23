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
import { URL } from '../../../src/redux/applicationReducer';
import ModuleStatus from '../../../src/components/settings/moduleStatus';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const data = {
    response: true,
  };

  mock.onGet(`${URL}Debug`).reply(200, data);
}

describe('Module Status Tests', () => {
  let wrapper;
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    hasErrors: false,
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<ModuleStatus store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = ModuleStatus.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      moduleStatus: PropTypes.object.isRequired,
      hasErrors: PropTypes.bool.isRequired,
      changeModulesStatus: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the status of the modules', async () => {
    const response = await wrapper.instance().getModulesStatus();

    expect(response).toEqual({ response: true });
  });

  it('should poll the server at the polling interval', () => {
    const clock = sinon.useFakeTimers();
    const spy = sinon.spy(wrapper.instance(), 'updateModulesStatus');

    wrapper.instance().poll();
    expect(spy.callCount).toEqual(0);

    clock.tick(5000);
    expect(spy.callCount).toEqual(1);

    clock.tick(5000);
    expect(spy.callCount).toEqual(2);

    clock.tick(5000);
    expect(spy.callCount).toEqual(3);

    clock.tick(5000);
    expect(spy.callCount).toEqual(4);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
