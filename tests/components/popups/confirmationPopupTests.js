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
    language: 'en',
    title: 'Title test',
    body: 'Body test',
    show: true,
  };

  beforeEach(() => {
    onCloseSpy.resetHistory();
    onConfirmSpy.resetHistory();
    wrapper = shallow(<ConfirmationPopup store={store} {...props} />).dive();
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

  it('should trigger onClose when hiding the dialog', () => {
    wrapper.simulate('hide');

    expect(onCloseSpy.calledOnce).toEqual(true);
  });

  it('should trigger onConfirm when simulating a click on the button', () => {
    const footer = shallow(wrapper.props().footer);

    footer.find('#confirmButton').simulate('click');

    expect(onConfirmSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
