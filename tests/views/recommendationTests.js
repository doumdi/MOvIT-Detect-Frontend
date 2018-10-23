import PropTypes from 'prop-types';
import Recommendation from '../../src/views/recommendation';

describe('Recommendation Tests', () => {
  it('should have proptypes', () => {
    // Actual value
    const actualValue = Recommendation.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      language: PropTypes.string.isRequired,
      header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
