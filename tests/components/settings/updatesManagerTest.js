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
import UpdatesManager from '../../../src/components/settings/updatesManager';
import { URL } from '../../../src/redux/applicationReducer';

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
  const initialState = {
    applicationReducer: {
      language: 'en',
      header: '',
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    hasErrors: false,
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<UpdatesManager store={store} {...props} />).dive();
    wrapper.setState({
      isPopupOpened: true,
    });
  });

  it('should have proptypes', () => {
    const actualValue = UpdatesManager.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      isUpdateAvailable: PropTypes.bool.isRequired,
      changeIsUpdateAvailable: PropTypes.func.isRequired,
      hasErrors: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should get the update availability', async () => {
    const response = await wrapper.instance().getUpdates();

    expect(response).toEqual({ response: true });
  });

  it('should poll the server at the polling interval', () => {
    const clock = sinon.useFakeTimers();
    const spy = sinon.spy(wrapper.instance(), 'triggerUpdatesChange');

    wrapper.instance().poll();
    expect(spy.callCount).toEqual(0);

    clock.tick(10000);
    expect(spy.callCount).toEqual(1);

    clock.tick(10000);
    expect(spy.callCount).toEqual(2);

    clock.tick(10000);
    expect(spy.callCount).toEqual(3);

    clock.tick(10000);
    expect(spy.callCount).toEqual(4);
  });

  it('should show/hide the confirmation popup', () => {
    wrapper.instance().setState({ isPopupOpened: false });

    wrapper.instance().openModal();
    expect(wrapper.state('isPopupOpened')).toEqual(true);

    wrapper.instance().closeModal();
    expect(wrapper.state('isPopupOpened')).toEqual(false);
  });

  it('should show the confirmation popup when clicking on the update button', () => {
    wrapper.instance().setState({ isPopupOpened: false });

    wrapper.find('#updateButton').simulate('click');

    expect(wrapper.state('isPopupOpened')).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
