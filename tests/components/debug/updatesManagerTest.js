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
import { URL } from '../../../src/redux/applicationReducer';
import UpdatesManager from '../../../src/components/debug/updatesManager';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const data = {
    response: true,
  };

  mock.onGet(`${URL}updates`).reply(200, data);
}

describe('UpdatesManager Tests', () => {
  let wrapper;
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};
  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<UpdatesManager store={store} {...props} />).dive();
    wrapper.setState({
      isAvailable: false,
      date: null,
      isPopupOpened: true,
    });
  });

  it('should have proptypes', () => {
    const actualValue = UpdatesManager.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the update availability', async () => {
    const response = await wrapper.instance().getUpdateData();

    expect(response).toEqual({ response: true });
  });

  it('should poll the server at the polling interval', () => {
    const clock = sinon.useFakeTimers();
    const spy = sinon.spy(wrapper.instance(), 'getUpdateData');

    wrapper.instance().poll();
    expect(spy.callCount).toEqual(1);

    clock.tick(10000);
    expect(spy.callCount).toEqual(2);

    clock.tick(10000);
    expect(spy.callCount).toEqual(3);

    clock.tick(10000);
    expect(spy.callCount).toEqual(4);

    clock.tick(10000);
    expect(spy.callCount).toEqual(5);
  });

  it('should set the component state when mapping the server response', () => {
    const response = {
      isAvailable: true,
      date: 1517767200000,
    };

    wrapper.instance().mapData(response);

    expect(wrapper.state('isAvailable')).toEqual(true);
    expect(wrapper.state('date')).toEqual('2018-02-04');
  });

  it('should show the countdown popup', () => {
    wrapper.instance().setState({ isPopupOpened: false });

    wrapper.find('#updateButton').simulate('click');

    expect(wrapper.state('isPopupOpened')).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
