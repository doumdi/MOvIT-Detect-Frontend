/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import OtherRecommendation from '../../../src/components/recommendation/otherRecommendation';

Enzyme.configure({ adapter: new Adapter() });

describe('OtherRecommendation Tests', () => {
  const spy = sinon.spy();
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    recActive: true,
    title: 'Recommandation value',
    recTitle: 'Recommandation title',
    value: 0,
    language: 'en',
    onChangeActive: (value) => { spy(value); },
    onChangeValue: (value) => { spy(value); },
    onChangeRecTitle: (value) => { spy(value); },
  };

  beforeEach(() => {
    spy.resetHistory();
  });

  it('should have proptypes', () => {
    const actualValue = OtherRecommendation.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      recTitle: PropTypes.string,
      value: PropTypes.string,
      onChangeActive: PropTypes.func.isRequired,
      onChangeRecTitle: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onChangeActive when simulating a change event on the checkbox', () => {
    const wrapper = shallow(<OtherRecommendation store={store} {...props} />).dive();

    wrapper.find(Checkbox).simulate('change', { checked: false });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(false);
  });

  it('should trigger onChangeRecTitle when simulating a change event on the recommendation title', () => {
    const wrapper = shallow(<OtherRecommendation store={store} {...props} />).dive();

    wrapper.find('#otherRec').simulate('change', { target: { value: 'Test' } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('Test');
  });

  it('should trigger onChangeValue when simulating a change event on the recommendation value', () => {
    const wrapper = shallow(<OtherRecommendation store={store} {...props} />).dive();

    wrapper.find('#textRec').simulate('change', { target: { value: 'Test' } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual('Test');
  });

  it('should match the snapshot when the recommandation is active', () => {
    const wrapper = shallow(<OtherRecommendation store={store} {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot when the recommandation is inactive', () => {
    const inactiveProps = {
      recActive: false,
      title: 'Recommandation value',
      recTitle: 'Recommandation title',
      value: 0,
      language: 'en',
    };
    const wrapper = shallow(<OtherRecommendation store={store} {...inactiveProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
