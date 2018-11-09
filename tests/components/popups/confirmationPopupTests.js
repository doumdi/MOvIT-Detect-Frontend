/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import ConfirmationPopup from '../../../src/components/popups/confirmationPopup';

Enzyme.configure({ adapter: new Adapter() });

describe('ConfirmationPopup Tests', () => {
  let wrapper;
  const onCloseSpy = sinon.spy();
  const onConfirmSpy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    onClose: () => { onCloseSpy(); },
    onConfirm: () => { onConfirmSpy(); },
    title: 'Title test',
    body: 'Body test',
    show: true,
  };

  beforeEach(() => {
    onCloseSpy.resetHistory();
    onConfirmSpy.resetHistory();

    wrapper = shallow(<ConfirmationPopup store={store} {...props} />);
  });

  it('should have proptypes', () => {
    const actualValue = ConfirmationPopup.propTypes;

    const expectedValue = {
      onClose: PropTypes.func.isRequired,
      onConfirm: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      show: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onClose when simulating a click on the close button', () => {
    wrapper.find('#closeButton').simulate('click');

    expect(onCloseSpy.calledOnce).toEqual(true);
  });

  it('should trigger onConfirm when simulating a click on the confirmation button', () => {
    wrapper.find('#confirmButton').simulate('click');

    expect(onConfirmSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
