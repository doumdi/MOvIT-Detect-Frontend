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
import Goal from '../../src/views/goal';
import { SEC_IN_MIN } from '../../src/utilities/constants';

Enzyme.configure({ adapter: new Adapter() });

const TIMEOUT = 1000;

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);
  const response = true;

  mock.onGet(`${URL}goal`).reply(200, response);
  mock.onGet(`${URL}recommandation`).reply(200, response);
}

describe('Goal Tests', () => {
  let wrapper;
  const initialState = {
    applicationReducer: {
      header: '', language: 'FR',
    },
    recommendationReducer: {
      tiltFrequencyWeight: 10,
      tiltLengthWeight: 12,
      tiltAngleWeight: 20,
      tiltAngleMoving: 0,
      tiltAngleRest: 0,
      tiltFrequency: 0,
      tiltLength: 0,
      tiltAngle: 0,
      reduceWieght: true,
      reduceSwelling: true,
      reduceSlidingMoving: true,
      reduceSlidingRest: true,
      reducePain: true,
      allowRest: true,
      easeTransfer: true,
      improveComfort: true,
      other: true,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    swellingRecommendation: 'Swelling recommendation',
    painRecommendation: 'Pain recommendation',
    restRecommendation: 'Rest recommendation',
    transferRecommendation: 'Transfer recommendation',
    comfortRecommendation: 'Comfort recommendation',
  };

  initializeMockAdapter();

  beforeEach(() => {
    wrapper = shallow(<Goal store={store} {...props} />).dive();
    wrapper.setState({ isLoaded: true, hasErrors: false });

    const loadGoalsSpy = sinon.spy(wrapper.instance(), 'loadGoals');
    const loadRecommendationsSpy = sinon.spy(wrapper.instance(), 'loadRecommendations');

    setTimeout(() => {
      expect(loadGoalsSpy.calledOnce).toEqual(true);
      expect(loadRecommendationsSpy.calledOnce).toEqual(true);
      expect(wrapper.state('isLoaded')).toEqual(true);
      expect(wrapper.state('hasErrors')).toEqual(false);
    }, TIMEOUT);
  });

  it('should have proptypes', () => {
    const actualValue = Goal.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      swellingRecommendation: PropTypes.string,
      painRecommendation: PropTypes.string,
      restRecommendation: PropTypes.string,
      transferRecommendation: PropTypes.string,
      comfortRecommendation: PropTypes.string,
      otherRecommendations: PropTypes.string,
      reduceWeight: PropTypes.bool,
      reduceSlidingMoving: PropTypes.bool.isRequired,
      tiltAngleMoving: PropTypes.number.isRequired,
      tiltAngleRest: PropTypes.number.isRequired,
      allowRest: PropTypes.bool.isRequired,
      easeTransfers: PropTypes.bool.isRequired,
      improveComfort: PropTypes.bool.isRequired,
      other: PropTypes.bool.isRequired,
      otherRecommendationsTitle: PropTypes.bool,
      reduceSlidingRest: PropTypes.bool.isRequired,
      reduceSwelling: PropTypes.bool.isRequired,
      reducePain: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should map the goal data with the response', async () => {
    const spy = sinon.spy(wrapper.instance(), 'mapGoalData');

    await wrapper.instance().loadGoals();

    expect(spy.getCalls()[0].args[0]).toEqual(true);
    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should map the rec data with the response', async () => {
    const spy = sinon.spy(wrapper.instance(), 'mapRecData');

    await wrapper.instance().loadRecommendations();

    expect(spy.getCalls()[0].args[0]).toEqual(true);
    expect(wrapper.state('isLoaded')).toEqual(true);
    expect(wrapper.state('hasErrors')).toEqual(false);
  });

  it('should map the goal data', () => {
    const response = {
      tiltAngle: 10,
      tiltFrequency: 20 * SEC_IN_MIN,
      tiltLength: 100 * SEC_IN_MIN,
    };

    store.clearActions();

    wrapper.instance().mapGoalData(response);

    const actions = store.getActions();

    expect(actions[0].type).toEqual('TILT_ANGLE_GOAL');
    expect(actions[1].type).toEqual('TILT_FREQUENCY_GOAL');
    expect(actions[2].type).toEqual('TILT_LENGTH_GOAL');
    expect(actions[0].tiltAngleGoal).toEqual(10);
    expect(actions[1].tiltFrequencyGoal).toEqual(20);
    expect(actions[2].tiltLengthGoal).toEqual(100);
  });

  it('should map the rec data', () => {
    const response = {
      reduceWeight: {
        tiltFrequency: 10 * SEC_IN_MIN,
        tiltLength: 11 * SEC_IN_MIN,
        tiltAngle: 45,
      },
      reduceSlidingMoving: 30,
      reduceSlidingRest: 46,
      reduceSwelling: 'Do something new',
      reducePain: 'Reduce pain',
      allowRest: 'Yes',
      easeTransfers: 'Tilt as needed',
      improveComfort: 'Tilt as needed',
      other: {
        title: 'Title',
        value: 'Value',
      },
    };

    store.clearActions();

    wrapper.instance().mapRecData(response);

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
    expect(actions[1].tiltFrequencyWeight).toEqual(10);
    expect(actions[2].tiltLengthWeight).toEqual(11);
    expect(actions[3].tiltAngleWeight).toEqual(45);
    expect(actions[4].reduceSlidingMoving).toEqual(true);
    expect(actions[5].tiltAngleMoving).toEqual(30);
    expect(actions[6].reduceSlidingRest).toEqual(true);
    expect(actions[7].tiltAngleRest).toEqual(46);
    expect(actions[8].reduceSwelling).toEqual(true);
    expect(actions[9].swellingRecommendation).toEqual('Do something new');
    expect(actions[10].reducePain).toEqual(true);
    expect(actions[11].painRecommendation).toEqual('Reduce pain');
    expect(actions[12].allowRest).toEqual(true);
    expect(actions[13].restRecommendation).toEqual('Yes');
    expect(actions[14].easeTransfers).toEqual(true);
    expect(actions[15].transferRecommendation).toEqual('Tilt as needed');
    expect(actions[16].improveComfort).toEqual(true);
    expect(actions[17].comfortRecommendation).toEqual('Tilt as needed');
    expect(actions[18].other).toEqual(true);
    expect(actions[19].otherRecommendationsTitle).toEqual('Title');
    expect(actions[20].otherRecommendations).toEqual('Value');
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
