/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomCard from '../../../../src/components/shared/card';
import { URL } from '../../../../src/redux/applicationReducer';
import PressureCenter from '../../../../src/components/results/pressureResults/pressureCenter';

Enzyme.configure({ adapter: new Adapter() });

function setFakeState(wrapper) {
  wrapper.setState({ time: 10800000 });
  wrapper.setState({ index: 0 });
  wrapper.setState({
    centers: [
      { x: 0.2, y: 0.3 },
      { x: 0.1, y: 0.2 },
      { x: 0.5, y: 0.7 },
    ],
  });
  wrapper.setState({
    quadrants: [
      [
        { 0: { x: -1.2, y: 3.2 } },
        { 1: { x: 2.2, y: 3 } },
        { 2: { x: 3.2, y: -5.2 } },
        { 3: { x: -1.2, y: -3.2 } },
      ],
      [
        { 0: { x: -1.2, y: 3.2 } },
        { 1: { x: 0.2, y: -3 } },
        { 2: { x: 1.2, y: -2.2 } },
        { 3: { x: -2.2, y: -3.2 } },
      ],
      [
        { 0: { x: -3.2, y: 1.2 } },
        { 1: { x: 1.1, y: 2 } },
        { 2: { x: 3.1, y: -5.2 } },
        { 3: { x: -2.2, y: -5.2 } },
      ],
    ],
  });
  wrapper.setState({ hours: [10800000, 10800001, 10800002] });
  wrapper.setState({ currentCenter: { x: 0, y: 0 } });
  wrapper.setState({
    currentQuadrants: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  });
}

describe('PressureCenter Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { header: '' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    date: '1517720400000',
  };

  beforeEach(() => {
    wrapper = shallow(<PressureCenter store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = PressureCenter.propTypes;

    const expectedValue = {
      title: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should initialize state', () => {
    expect(wrapper.state('time')).toEqual(0);
    expect(wrapper.state('index')).toEqual(0);
    expect(wrapper.state('currentCenter')).toEqual({ x: 0, y: 0 });
    expect(wrapper.state('currentQuadrants')).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]);
    expect(wrapper.state('quadrants')).toEqual([]);
    expect(wrapper.state('centers')).toEqual([]);
    expect(wrapper.state('hours')).toEqual([]);
  });

  it('should get pressure data', async () => {
    const mock = new MockAdapter(axios);
    const data = {
      response: true,
    };

    mock.onGet(`${URL}gravityCenter?Day=1517720400000,offset=0`).reply(200, data);

    const response = await wrapper.instance().getPressureData(props.date);

    expect(response).toEqual(data);
  });

  it('should set the index', () => {
    setFakeState(wrapper);

    wrapper.instance().setIndex(1);

    expect(wrapper.state('index')).toEqual(1);
    expect(wrapper.state('currentCenter')).toEqual({ x: 0.1, y: 0.2 });
    expect(wrapper.state('currentQuadrants')).toEqual([
      { 0: { x: -1.2, y: 3.2 } },
      { 1: { x: 0.2, y: -3 } },
      { 2: { x: 1.2, y: -2.2 } },
      { 3: { x: -2.2, y: -3.2 } },
    ]);
    expect(wrapper.state('time')).toEqual(10800001);
  });

  it('should load the pressure data', () => {
    const data = {
      10800000: {
        center: {
          x: -0.2,
          y: 0.3,
        },
        quadrants: [
          { 0: { x: -1.2, y: 3.2 } },
          { 1: { x: 2.2, y: 3 } },
          { 2: { x: 3.2, y: -5.2 } },
          { 3: { x: -1.2, y: -3.2 } },
        ],
      },
    };
    const spy = sinon.spy(wrapper.instance(), 'setIndex');

    wrapper.instance().loadPressureData(data);

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(0);
    expect(wrapper.state('hours')).toEqual(['10800000']);
    expect(wrapper.state('centers')).toEqual([{ x: -0.2, y: 0.3 }]);
    expect(wrapper.state('quadrants')).toEqual([[
      { 0: { x: -1.2, y: 3.2 } },
      { 1: { x: 2.2, y: 3 } },
      { 2: { x: 3.2, y: -5.2 } },
      { 3: { x: -1.2, y: -3.2 } },
    ]]);
  });

  it('should trigger setIndex when simulating a change event on the Slider', () => {
    const spy = sinon.spy(wrapper.instance(), 'setIndex');

    setFakeState(wrapper);

    wrapper.find(CustomCard).dive().find(Slider).simulate('change', { value: 1 });

    expect(spy.calledOnce).toEqual(true);
    expect(spy.getCalls()[0].args[0]).toEqual(1);
  });

  it('should match the snapshot', () => {
    setFakeState(wrapper);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
