/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SubmitButtons from '../../../src/components/shared/submitButtons';

Enzyme.configure({ adapter: new Adapter() });

describe('SubmitButtons Tests', () => {
  const onSaveSpy = sinon.spy();
  const onCancelSpy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
    onSave: () => { onSaveSpy(); },
    onCancel: () => { onCancelSpy(); },
  };

  it('should have proptypes', () => {
    const actualValue = SubmitButtons.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      onSave: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onSave when clicking on submit', () => {
    const wrapper = shallow(<SubmitButtons store={store} {...props} />).dive();
    onSaveSpy.resetHistory();

    wrapper.find('#saveButton').simulate('click');

    expect(onSaveSpy.calledOnce).toEqual(true);
  });

  it('should trigger onCancel when clicking on cancel', () => {
    const wrapper = shallow(<SubmitButtons store={store} {...props} />).dive();
    onCancelSpy.resetHistory();

    wrapper.find('#cancelButton').simulate('click');

    expect(onCancelSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<SubmitButtons store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot with invisible cancel', () => {
    props.displayCancel = false;
    const wrapper = shallow(<SubmitButtons store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
