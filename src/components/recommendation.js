import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';
import AngleRecommendation from './angleRecommendation';
import TextRecommendation from './textRecommendation';
import OtherRecommendation from './otherRecommendation';
import SubmitButtons from './submitButtons';
import TiltSliders from './tiltSliders';

class Recommendation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      maxSliderAngle: 90,
    };

    this.setMaxAngle();
  }

  setMaxAngle() {
    if (this.props.maxAngle) {
      this.state.maxSliderAngle = this.props.maxAngle;
    }
  }

  changeFrequencyGoal(value) {
    this.props.changeTiltFrequencyWeight(value);
    this.props.changeTiltFrequencyGoal(value);
  }

  changeLengthGoal(value) {
    this.props.changeTiltLengthWeight(value);
    this.props.changeTiltLengthGoal(value);
  }

  changeAngleGoal(value) {
    this.props.changeTiltAngleWeight(value);
    this.props.changeTiltAngleGoal(value);
  }

  save() {
    this.props.history.push('/goals');
  }
  cancel() {
    console.log('clear all fields');
  }

  render() {
    return (
      <div>
        <div className="container">
          <center><h2>{T.translate(`recommendations.${this.props.language}`)}</h2></center>
          <legend className="text-center header"><h4>{T.translate(`recommendations.recommendationsText.${this.props.language}`)}</h4></legend>
          <div className="col-sm-12">
            <div className="col-sm-12">
              <Checkbox
                inputId="reduceWeightCheck"
                label="Reduce weight"
                onChange={this.props.changeReduceWeight}
                checked={this.props.reduceWeight}
              />
              <label htmlFor="reduceWeightCheck">{T.translate(`recommendations.reduceWeight.${this.props.language}`)}</label>
            </div>
            {this.props.reduceWeight
            ?
              <TiltSliders
                tiltFrequecy={this.props.tiltFrequencyWeight}
                tiltLength={this.props.tiltLengthWeight}
                tiltAngle={this.props.tiltAngleWeight}
                maxAngle={this.state.maxSliderAngle}
                onFrequencyChange={this.changeFrequencyGoal.bind(this)}
                onLengthChange={this.changeLengthGoal.bind(this)}
                onAngleChange={this.changeAngleGoal.bind(this)}
              />
            : null}
            <AngleRecommendation
              recActive={this.props.reduceSlidingMoving}
              title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
              maxAngle={this.state.maxSliderAngle}
              value={this.props.tiltAngleMoving}
              onChangeActive={this.props.changeReduceSlidingMoving}
              onChangeValue={this.props.changeTiltAngleMoving}
            />
            <AngleRecommendation
              recActive={this.props.reduceSlidingRest}
              title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
              maxAngle={this.state.maxSliderAngle}
              value={this.props.tiltAngleRest}
              onChangeActive={this.props.changeReduceSlidingRest}
              onChangeValue={this.props.changeTiltAngleRest}
            />
            <TextRecommendation
              onChangeActive={this.props.changeReduceSwelling}
              recActive={this.props.reduceSwelling}
              title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
              value={this.props.swellingRecommendation}
              onChangeValue={this.props.reduceSwellingRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeReducePain}
              recActive={this.props.reducePain}
              title={T.translate(`recommendations.pain.${this.props.language}`)}
              value={this.props.painRecommendation}
              onChangeValue={this.props.reducePainRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeAllowRest}
              recActive={this.props.allowRest}
              title={T.translate(`recommendations.rest.${this.props.language}`)}
              value={this.props.restRecommendation}
              onChangeValue={this.props.allowRestRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeEaseTransfers}
              recActive={this.props.easeTransfers}
              title={T.translate(`recommendations.transfer.${this.props.language}`)}
              value={this.props.transferRecommendation}
              onChangeValue={this.props.easeTransfersRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeImproveComfort}
              recActive={this.props.improveComfort}
              title={T.translate(`recommendations.comfort.${this.props.language}`)}
              value={this.props.comfortRecommendation}
              onChangeValue={this.props.improveComfortRecommendation}
            />
            <OtherRecommendation
              onChangeActive={this.props.changeOther}
              recActive={this.props.other}
              title={T.translate(`recommendations.other.${this.props.language}`)}
              redTitle={this.props.otherRecommendationsTitle}
              value={this.props.otherRecommendations}
              onChangeValue={this.props.otherRecommendation}
              onChangeRecTitle={this.props.otherRecommendationTitle}
            />
          </div>
        </div>
        <SubmitButtons
          onSave={this.save.bind(this)}
          onCancel={this.cancel}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    reduceWeight: state.applicationReducer.reduceWeight,
    reduceSwelling: state.applicationReducer.reduceSwelling,
    reduceSlidingMoving: state.applicationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.applicationReducer.reduceSlidingRest,
    reducePain: state.applicationReducer.reducePain,
    allowRest: state.applicationReducer.allowRest,
    easeTransfers: state.applicationReducer.easeTransfers,
    improveComfort: state.applicationReducer.improveComfort,
    other: state.applicationReducer.other,
    tiltFrequencyWeight: state.applicationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.applicationReducer.tiltLengthWeight,
    tiltAngleWeight: state.applicationReducer.tiltAngleWeight,
    tiltAngleMoving: state.applicationReducer.tiltAngleMoving,
    tiltAngleRest: state.applicationReducer.tiltAngleRest,
    painRecommendation: state.applicationReducer.painRecommendation,
    swellingRecommendation: state.applicationReducer.swellingRecommendation,
    restRecommendation: state.applicationReducer.restRecommendation,
    transferRecommendation: state.applicationReducer.transferRecommendation,
    comfortRecommendation: state.applicationReducer.comfortRecommendation,
    otherRecommendations: state.applicationReducer.otherRecommendations,
    otherRecommendationsTitle: state.applicationReducer.otherRecommendationsTitle,
    maxAngle: state.applicationReducer.maxAngle,
    tiltFrequencyGoal: state.applicationReducer.tiltFrequencyGoal,
    tiltLengthGoal: state.applicationReducer.tiltLengthGoal,
    tiltAngleGoal: state.applicationReducer.tiltAngleGoal,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeReduceWeight: ApplicationActions.changeReduceWeight,
    changeReduceSwelling: ApplicationActions.changeReduceSwelling,
    changeReduceSlidingMoving: ApplicationActions.changeReduceSlidingMoving,
    changeReduceSlidingRest: ApplicationActions.changeReduceSlidingRest,
    changeReducePain: ApplicationActions.changeReducePain,
    changeAllowRest: ApplicationActions.changeAllowRest,
    changeEaseTransfers: ApplicationActions.changeEaseTransfers,
    changeImproveComfort: ApplicationActions.changeImproveComfort,
    changeOther: ApplicationActions.changeOther,
    changeTiltFrequencyWeight: ApplicationActions.changeTiltFrequencyWeight,
    changeTiltLengthWeight: ApplicationActions.changeTiltLengthWeight,
    changeTiltAngleWeight: ApplicationActions.changeTiltAngleWeight,
    changeTiltAngleMoving: ApplicationActions.changeTiltAngleMoving,
    changeTiltAngleRest: ApplicationActions.changeTiltAngleRest,
    reducePainRecommendation: ApplicationActions.reducePainRecommendation,
    reduceSwellingRecommendation: ApplicationActions.reduceSwellingRecommendation,
    allowRestRecommendation: ApplicationActions.allowRestRecommendation,
    easeTransfersRecommendation: ApplicationActions.easeTransfersRecommendation,
    improveComfortRecommendation: ApplicationActions.improveComfortRecommendation,
    otherRecommendation: ApplicationActions.otherRecommendation,
    otherRecommendationTitle: ApplicationActions.otherRecommendationTitle,
    changeTiltFrequencyGoal: ApplicationActions.changeTiltFrequencyGoal,
    changeTiltLengthGoal: ApplicationActions.changeTiltLengthGoal,
    changeTiltAngleGoal: ApplicationActions.changeTiltAngleGoal,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
