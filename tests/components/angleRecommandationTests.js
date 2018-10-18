import React from 'react';
import PropTypes from 'prop-types';
import AngleRecommendation from '../../src/components/angleRecommendation';
import SliderValue from '../../src/components/sliderValue';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import configureMockStore from "redux-mock-store";

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() })

describe('AngleRecommandation Tests', () => {
  const initialState = {applicationReducer: {language: 'en'}}
  const mockStore = configureMockStore()
  const store = mockStore(initialState)
  const activeProps = {
    recActive: true,
    title: 'Test',
    maxAngle: 45,
    value: 10,
    language: 'en',
  };
  const inactiveProps = {
    recActive: false,
    title: 'Test',
    maxAngle: 45,
    value: 10,
    language: 'en',
  };

  it('should have proptypes', function () {
    const actualValue = AngleRecommendation.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      recActive: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      maxAngle: PropTypes.number.isRequired,
      value: PropTypes.number,
      onChangeActive: PropTypes.func.isRequired,
      onChangeValue: PropTypes.func.isRequired,
    }

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  })

  it('should render the component', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...activeProps}/>).dive();

    expect(wrapper.length).toEqual(1)
    expect(wrapper.find('.col-sm-12').length).toEqual(1)
    expect(wrapper.find('.col-sm-4').length).toEqual(1)
    expect(wrapper.find('.col-sm-4').props().style).toEqual({paddingLeft: '0'})
    expect(wrapper.find('label').length).toEqual(1)
    expect(wrapper.find('label').text()).toEqual('Test')
  });

  it('should render the checkbox when the recommandation is active', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...activeProps}/>).dive();

    expect(wrapper.find(Checkbox).props().checked).toEqual(true)
    expect(wrapper.find(Checkbox).length).toEqual(1)
    expect(wrapper.find(Checkbox).props().label).toEqual('Test')
    expect(wrapper.find(Checkbox).props().inputId).toEqual('activeRecCheck')
  });

  it('should render the checkbox when the recommandation is inactive', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...inactiveProps}/>).dive();

    expect(wrapper.find(Checkbox).props().checked).toEqual(false)
    expect(wrapper.find(Checkbox).length).toEqual(1)
    expect(wrapper.find(Checkbox).props().label).toEqual('Test')
    expect(wrapper.find(Checkbox).props().inputId).toEqual('activeRecCheck')
  });

  it('should render the SliderValue when the recommandation is active', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...activeProps}/>).dive();

    expect(wrapper.find(SliderValue).length).toEqual(1)
    expect(wrapper.find(SliderValue).props().min).toEqual(0)
    expect(wrapper.find(SliderValue).props().max).toEqual(45)
    expect(wrapper.find(SliderValue).props().value).toEqual(10)
    expect(wrapper.find(SliderValue).props().unit).toEqual('°')
    expect(wrapper.find(SliderValue).props().title).toEqual('recommendations.angle.en')
  });

  it('should not render the SliderValue when the recommandation is inactive', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...inactiveProps}/>).dive();

    expect(wrapper.find(SliderValue).length).toEqual(0)
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<AngleRecommendation store={store} {...activeProps}/>).dive();

    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
