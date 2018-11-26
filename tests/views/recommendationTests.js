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
import { URL } from '../../src/redux/applicationReducer';
import Recommendation from '../../src/views/recommendation';

Enzyme.configure({ adapter: new Adapter() });

const TIMEOUT = 1000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const response = true;

  mock.onGet(`${URL}recommandation`).reply(200, response);
}

describe('Recommendation Tests', () => {
  let wrapper;
  const initialState = {
    applicationReducer: {
      language: 'FR',
    },
    recommendationReducer: {
      tiltFrequencyWeight: 10,
      tiltLengthWeight: 12,
      tiltAngleWeight: 20,
      tiltAngleMoving: 0,
      tiltAngleRest: 0,
      painRecommentation: '',
      swellingRecommendation: '',
      restRecommendation: '',
      transferRecommendation: '',
      comfortRecommendation: '',
      otherRecommendations: '',
      otherRecommendationsTitle: '',
      reduceWeight: true,
      reduceSwelling: true,
      reduceSlidingMoving: true,
      reduceSlidingRest: true,
      reducePain: true,
      allowRest: true,
      easeTransfer: true,
      improveComfort: true,
      other: true,
    },
    configurationReducer: {
      maxAngle: 60,
    },
  };
  const secToMin = 60;
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    history: [],
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<Recommendation store={store} {...props} />).dive();
    wrapper.setState({ isLoaded: true, hasErrors: false });

    const spy = sinon.spy(wrapper.instance(), 'load');

    setTimeout(() => {
      expect(spy.calledOnce).toEqual(true);
      expect(wrapper.state('maxSliderAngle')).toEqual(90);
      expect(wrapper.state('isLoaded')).toEqual(true);
      expect(wrapper.state('hasErrors')).toEqual(false);
    }, TIMEOUT);
  });

  it('should have proptypes', () => {
    const actualValue = Recommendation.WrappedComponent.propTypes;

    const expectedValue = {
      history: PropTypes.object.isRequired,
      language: PropTypes.string.isRequired,
      swellingRecommendation: PropTypes.string,
      painRecommendation: PropTypes.string,
      restRecommendation: PropTypes.string,
      transferRecommendation: PropTypes.string,
      comfortRecommendation: PropTypes.string,
      otherRecommendations: PropTypes.string,
      maxAngle: PropTypes.number,
      reduceWeight: PropTypes.bool,
      tiltFrequencyWeight: PropTypes.number.isRequired,
      tiltLengthWeight: PropTypes.number.isRequired,
      tiltAngleWeight: PropTypes.number.isRequired,
      changeTiltFrequencyGoal: PropTypes.func.isRequired,
      changeTiltLengthGoal: PropTypes.func.isRequired,
      reduceSlidingMoving: PropTypes.bool.isRequired,
      tiltAngleMoving: PropTypes.number.isRequired,
      tiltAngleRest: PropTypes.number.isRequired,
      allowRest: PropTypes.bool.isRequired,
      easeTransfers: PropTypes.bool.isRequired,
      improveComfort: PropTypes.bool.isRequired,
      other: PropTypes.bool.isRequired,
      otherRecommendationsTitle: PropTypes.string,
      reduceSlidingRest: PropTypes.bool.isRequired,
      reduceSwelling: PropTypes.bool.isRequired,
      reducePain: PropTypes.bool.isRequired,
      changeTiltAngleGoal: PropTypes.func.isRequired,
      changeTiltFrequencyWeight: PropTypes.func.isRequired,
      changeTiltAngleWeight: PropTypes.func.isRequired,
      changeTiltLengthWeight: PropTypes.func.isRequired,
      changeReduceWeight: PropTypes.func.isRequired,
      changeReduceSlidingMoving: PropTypes.func.isRequired,
      changeTiltAngleMoving: PropTypes.func.isRequired,
      changeReduceSlidingRest: PropTypes.func.isRequired,
      changeTiltAngleRest: PropTypes.func.isRequired,
      changeReduceSwelling: PropTypes.func.isRequired,
      otherRecommendationTitle: PropTypes.func,
      reduceSwellingRecommendation: PropTypes.func,
      changeImproveComfort: PropTypes.func,
      improveComfortRecommendation: PropTypes.func,
      changeReducePain: PropTypes.func,
      otherRecommendation: PropTypes.func,
      reducePainRecommendation: PropTypes.func,
      changeOther: PropTypes.func,
      easeTransfersRecommendation: PropTypes.func,
      changeEaseTransfers: PropTypes.func,
      changeAllowRest: PropTypes.func,
      allowRestRecommendation: PropTypes.func,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should map the data with the response', async () => {
    const spy = sinon.spy(wrapper.instance(), 'mapData');

    await wrapper.instance().load();

    expect(spy.getCalls()[0].args[0]).toEqual(true);
    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should map the data', () => {
    const response = {
      reduceWeight: {
        tiltAngle: 40,
        tiltFrequency: 100,
        tiltLength: 6,
      },
      reduceSlidingMoving: 30,
      reduceSlidingRest: 46,
      reduceSwelling: 'Do something new',
      reducePain: 'Tilt as needed',
      allowRest: 'yes',
      easeTransfers: 'Tilt as needed',
      improveComfort: 'Tilt as needed',
      other: {
        title: 'New Recommendation Title',
        value: 'New Recommendation Description',
      },
    };

    store.clearActions();

    wrapper.instance().mapData(response);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('REDUCE_WEIGHT');
    expect(actions[1].type).toEqual('TILT_FREQUENCY_WEIGHT');
    expect(actions[2].type).toEqual('TILT_LENGTH_WEIGHT');
    expect(actions[3].type).toEqual('TILT_ANGLE_WEIGHT');
    expect(actions[4].type).toEqual('REDUCE_SLIDING_MOVING');
    expect(actions[5].type).toEqual('TILT_ANGLE_MOVING');
    expect(actions[6].type).toEqual('REDUCE_SLIDING_REST');
    expect(actions[7].type).toEqual('TILT_ANGLE_REST');
    expect(actions[8].type).toEqual('REDUCE_SWELLING');
    expect(actions[9].type).toEqual('REDUCE_SWELLING_RECOMMENDATION');
    expect(actions[10].type).toEqual('REDUCE_PAIN');
    expect(actions[11].type).toEqual('REDUCE_PAIN_RECOMMENDATION');
    expect(actions[12].type).toEqual('ALLOW_REST');
    expect(actions[13].type).toEqual('ALLOW_REST_RECOMMENDATION');
    expect(actions[14].type).toEqual('EASE_TRANSFERS');
    expect(actions[15].type).toEqual('EASE_TRANSFERS_RECOMMENDATION');
    expect(actions[16].type).toEqual('IMPROVE_COMFORT');
    expect(actions[17].type).toEqual('IMPROVE_COMFORT_RECOMMENDATION');
    expect(actions[18].type).toEqual('OTHER');
    expect(actions[19].type).toEqual('OTHER_RECOMMENDATION_TITLE');
    expect(actions[20].type).toEqual('OTHER_RECOMMENDATION');

    expect(actions[0].reduceWeight).toEqual(true);
    expect(actions[1].tiltFrequencyWeight).toEqual(100/secToMin);
    expect(actions[2].tiltLengthWeight).toEqual(6/secToMin);
    expect(actions[3].tiltAngleWeight).toEqual(40);
    expect(actions[4].reduceSlidingMoving).toEqual(true);
    expect(actions[5].tiltAngleMoving).toEqual(30);
    expect(actions[6].reduceSlidingRest).toEqual(true);
    expect(actions[7].tiltAngleRest).toEqual(46);
    expect(actions[8].reduceSwelling).toEqual(true);
    expect(actions[9].swellingRecommendation).toEqual('Do something new');
    expect(actions[10].reducePain).toEqual(true);
    expect(actions[11].painRecommendation).toEqual('Tilt as needed');
    expect(actions[12].allowRest).toEqual(true);
    expect(actions[13].restRecommendation).toEqual('yes');
    expect(actions[14].easeTransfers).toEqual(true);
    expect(actions[15].transferRecommendation).toEqual('Tilt as needed');
    expect(actions[16].improveComfort).toEqual(true);
    expect(actions[17].comfortRecommendation).toEqual('Tilt as needed');
    expect(actions[18].other).toEqual(true);
    expect(actions[19].otherRecommendationsTitle).toEqual('New Recommendation Title');
    expect(actions[20].otherRecommendations).toEqual('New Recommendation Description');
  });

  it('should change the tilt frequency', () => {
    store.clearActions();

    wrapper.instance().changeTiltFrequency(28);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('TILT_FREQUENCY_WEIGHT');
    expect(actions[1].type).toEqual('TILT_FREQUENCY_GOAL');
    expect(actions[0].tiltFrequencyWeight).toEqual(28);
    expect(actions[1].tiltFrequencyGoal).toEqual(28);
  });

  it('should change the tilt length', () => {
    store.clearActions();

    wrapper.instance().changeTiltLength(33);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('TILT_LENGTH_WEIGHT');
    expect(actions[1].type).toEqual('TILT_LENGTH_GOAL');
    expect(actions[0].tiltLengthWeight).toEqual(33);
    expect(actions[1].tiltLengthGoal).toEqual(33);
  });

  it('should change the tilt angle', () => {
    store.clearActions();

    wrapper.instance().changeTiltAngle(60);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('TILT_ANGLE_WEIGHT');
    expect(actions[1].type).toEqual('TILT_ANGLE_GOAL');
    expect(actions[0].tiltAngleWeight).toEqual(60);
    expect(actions[1].tiltAngleGoal).toEqual(60);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
