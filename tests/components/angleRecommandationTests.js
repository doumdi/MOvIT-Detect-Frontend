import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import AngleRecommendation from '../../src/components/angleRecommendation';
import SliderValue from '../../src/components/sliderValue';

Enzyme.configure({ adapter: new Adapter() });

describe('AngleRecommandation Tests', () => {
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
    onChangeActive: onChangeActiveSpy,
    onChangeValue: onChangeValueSpy,
  };

  it('should have proptypes', () => {
    const actualValue = AngleRecommendation.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      maxAngle: PropTypes.number.isRequired,
      value: PropTypes.number,
      onChangeActive: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should trigger onChangeActive when simulating a change event on checkbox', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...props} />).dive();

    wrapper.find(Checkbox).simulate('change', {});
    expect(onChangeActiveSpy.calledOnce).toEqual(true);
  });

  it('should trigger onChangeValue when simulating a change event on SliderValue', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...props} />).dive();

    wrapper.find(SliderValue).simulate('change', {});
    expect(onChangeValueSpy.calledOnce).toEqual(true);
  });

  it('should match the snapshot when the recommandation is active', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...props} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot when the recommandation is inactive', () => {
    const inactiveProps = {
      recActive: false,
      title: 'Test',
      maxAngle: 45,
      value: 10,
      language: 'en',
    };
    const wrapper = shallow(<AngleRecommendation store={store} {...inactiveProps} />).dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
