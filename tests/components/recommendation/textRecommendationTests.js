/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TextRecommendation from '../../../src/components/recommendation/textRecommendation';

Enzyme.configure({ adapter: new Adapter() });

describe('TextRecommandation Tests', () => {
  const onChangeActiveSpy = sinon.spy();
  const onChangeValueSpy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    recActive: true,
    title: 'Test',
    maxAngle: 45,
    value: 0,
    language: 'en',
    onChangeActive: (value) => { onChangeActiveSpy(value); },
    onChangeValue: (value) => { onChangeValueSpy(value); },
  };

  beforeEach(() => {
    onChangeValueSpy.resetHistory();
    onChangeActiveSpy.resetHistory();
  });

  it('should have proptypes', () => {
    const actualValue = TextRecommendation.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChangeActive: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onChangeActive when simulating a change event on checkbox', () => {
    const wrapper = shallow(<TextRecommendation store={store} {...props} />).dive();

    wrapper.find(Checkbox).simulate('change', { checked: false });

    expect(onChangeActiveSpy.calledOnce).toEqual(true);
    expect(onChangeActiveSpy.getCalls()[0].args[0]).toEqual(false);
  });

  it('should trigger onChangeValue with an empty string when simulating a change event on checkbox', () => {
    const wrapper = shallow(<TextRecommendation store={store} {...props} />).dive();

    wrapper.find(Checkbox).simulate('change', { checked: false });

    expect(onChangeValueSpy.calledOnce).toEqual(true);
    expect(onChangeValueSpy.getCalls()[0].args[0]).toEqual('');
  });

  it('should trigger onChangeValue with a parameter when simulating a change event on checkbox', () => {
    const wrapper = shallow(<TextRecommendation store={store} {...props} />).dive();

    wrapper.find(Checkbox).simulate('change', { checked: true });

    expect(onChangeValueSpy.calledOnce).toEqual(true);
    expect(onChangeValueSpy.getCalls()[0].args[0]).toEqual('recommendations.tiltAsNeeded.en');
  });

  it('should trigger onChangeValue when simulating a change event on InputText', () => {
    const wrapper = shallow(<TextRecommendation store={store} {...props} />).dive();

    wrapper.find(InputText).simulate('change', { target: { value: 'Test' } });

    expect(onChangeValueSpy.calledOnce).toEqual(true);
    expect(onChangeValueSpy.getCalls()[0].args[0]).toEqual('Test');
  });

  it('should match the snapshot when the recommendation is active', () => {
    const wrapper = shallow(<TextRecommendation store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot when the recommendation is inactive', () => {
    const inactiveProps = {
      recActive: false,
      title: 'Test',
      maxAngle: 45,
      value: 10,
      language: 'en',
    };
    const wrapper = shallow(<TextRecommendation store={store} {...inactiveProps} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
