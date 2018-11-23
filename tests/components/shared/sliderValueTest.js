/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Slider } from 'primereact/components/slider/Slider';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import SliderValue from '../../../src/components/shared/sliderValue';

Enzyme.configure({ adapter: new Adapter() });

describe('SliderValue Tests', () => {
  const props = {
    value: 12,
    min: 10,
    max: 20,
    title: 'This is a test',
    unit: 'm',
    onChange: () => { },
  };

  it('should trigger onChange when simulating a change event on the Slider', () => {
    const wrapper = shallow(<SliderValue {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'onValueChange');

    wrapper.find(Slider).simulate('change', { value: 10 });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(10);
  });

  it('should trigger onChange when simulating a change event on the input field', () => {
    const wrapper = shallow(<SliderValue {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'onValueChange');

    wrapper.find('#value').simulate('change', { target: { value: 10 } });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(10);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<SliderValue {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
