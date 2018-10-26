/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import axios from 'axios';
import { GoalActions } from '../redux/goalReducer';
import { RecommendationActions } from '../redux/recommendationReducer';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import PressureRecPanel from '../components/pressureRecPanel';
import RecPanel from '../components/recPanel';
import TiltLabels from '../components/tiltLabels';


class Goal extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    tiltFrequencyWeight: PropTypes.number.isRequired,
    tiltLengthWeight: PropTypes.number.isRequired,
    tiltAngleWeight: PropTypes.number.isRequired,
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
    changeTiltFrequencyWeight: PropTypes.func,
    changeTiltLengthWeight: PropTypes.func,
    changeTiltAngleWeight: PropTypes.func,
    changeTiltFrequencyGoal: PropTypes.func,
    changeTiltLengthGoal: PropTypes.func,
    changeTiltAngleGoal: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      swellingRecommendation: props.swellingRecommendation,
      painRecommendation: props.painRecommendation,
      restRecommendation: props.restRecommendation,
      transferRecommendation: props.transferRecommendation,
      comfortRecommendation: props.comfortRecommendation,
      otherRecommendations: props.otherRecommendations,
    };
    this.loadGoals();
    this.loadRecommendations();
  }

  loadGoals() {
    axios.get(`${URL}goal`, this.props.header)
      .then(response => this.mapGoalData(response.data))
      .catch(console.log);
  }

  loadRecommendations() {
    if (this.props.reduceWeight) { // most important rec, if this is not existing, reload recs
      return;
    }
    axios.get(`${URL}recommandation`, this.props.header)
      .then(response => this.mapRecData(response.data))
      .catch(console.log);
  }

  mapGoalData(response) {
    this.props.changeTiltAngleGoal(response.tiltAngle);
    this.props.changeTiltFrequencyGoal(response.tiltFrequency);
    this.props.changeTiltLengthGoal(response.tiltLength);
  }

  mapRecData(response) {
    if (response.reduceWeight) {
      this.props.changeReduceWeight(true);
      this.props.changeTiltFrequencyWeight(response.reduceWeight.tiltFrequency);
      this.props.changeTiltLengthWeight(response.reduceWeight.tiltLength);
      this.props.changeTiltAngleWeight(response.reduceWeight.tiltAngle);
    }
    if (response.reduceSlidingMoving) {
      this.props.changeReduceSlidingMoving(true);
      this.props.changeTiltAngleMoving(response.reduceSlidingMoving);
    }
    if (response.reduceSlidingRest) {
      this.props.changeReduceSlidingRest(true);
      this.props.changeTiltAngleRest(response.reduceSlidingRest);
    }
    if (response.reduceSwelling) {
      this.props.changeReduceSwelling(true);
      this.props.reduceSwellingRecommendation(response.reduceSwelling);
    }
    if (response.reducePain) {
      this.props.changeReducePain(true);
      this.props.reducePainRecommendation(response.reducePain);
    }
    if (response.allowRest) {
      this.props.changeAllowRest(true);
      this.props.allowRestRecommendation(response.allowRest);
    }
    if (response.easeTransfers) {
      this.props.changeEaseTransfers(true);
      this.props.easeTransfersRecommendation(response.easeTransfers);
    }
    if (response.improveComfort) {
      this.props.changeImproveComfort(true);
      this.props.improveComfortRecommendation(response.improveComfort);
    }
    if (response.other) {
      this.props.changeOther(true);
      this.props.otherRecommendationTitle(response.other.title);
      this.props.otherRecommendation(response.other.value);
    }
  }

  render() {
    const style = {
      chair: {
        textAlign: 'center',
        marginTop: '1em',
      },
      panelGroup: {
        height: '80em',
        maxHeight: '150em',
        overflowY: 'auto',
      },
    };

    return (
      <div className="mt-3">
        <legend className="text-center header">
          <h2>
            {T.translate(`goals.${this.props.language}`)} &nbsp;
            <i id="titleInfo" className="fa fa-info-circle" />
          </h2>
        </legend>
        {!this.props.reduceWeight && !this.props.reduceSwelling
          && !this.props.reduceSlidingMoving && !this.props.reducePain
          && !this.props.allowRest && !this.props.easeTransfers
          && !this.props.improveComfort && !this.props.other
          ? <h3 style={style.chair}>{T.translate(`goals.noRecommendations.${this.props.language}`)}</h3>
          : <div className="row" style={style.panelGroup}>
            <div className="col-12 col-md-8 offset-md-2">
              <h3 className="ml-2 text-md-left text-center">
                {T.translate(`goals.personalGoals.${this.props.language}`)} &nbsp; <i id="personalGoalInfo" className="fa fa-info-circle" />
              </h3>
              <PressureRecPanel />
              <h3 className="ml-2 text-md-left text-center">{T.translate(`goals.ClinicianRecommendations.${this.props.language}`)}</h3>
              {this.props.reduceWeight
                &&
                <TiltLabels
                  title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                  tiltFrequecy={this.props.tiltFrequencyWeight}
                  tiltLength={this.props.tiltLengthWeight}
                  tiltAngle={this.props.tiltAngleWeight}
                />
              }
              <div className="d-flex flex-wrap">
                <RecPanel
                  condition={this.props.reduceSlidingMoving}
                  title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
                  value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                  ${this.props.tiltAngleMoving}°
                  ${T.translate(`goals.reduceSlidingMoving.${this.props.language}`)}`}
                />
                <RecPanel
                  condition={this.props.reduceSlidingRest}
                  title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
                  value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                  ${this.props.tiltAngleRest}°
                  ${T.translate(`goals.reduceSlidingRest.${this.props.language}`)}`}
                />
                <RecPanel
                  condition={this.props.reduceSwelling}
                  title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
                  value={this.state.swellingRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.swellingRecommendation}
                />
                <RecPanel
                  condition={this.props.reducePain}
                  title={T.translate(`recommendations.pain.${this.props.language}`)}
                  value={this.state.painRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.painRecommendation}
                />
                <RecPanel
                  condition={this.props.allowRest}
                  title={T.translate(`recommendations.rest.${this.props.language}`)}
                  value={this.state.restRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.restRecommendation}
                />
                <RecPanel
                  condition={this.props.easeTransfers}
                  title={T.translate(`recommendations.transfer.${this.props.language}`)}
                  value={this.state.transferRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.transferRecommendation}
                />
                <RecPanel
                  condition={this.props.improveComfort}
                  title={T.translate(`recommendations.comfort.${this.props.language}`)}
                  value={this.state.comfortRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.comfortRecommendation}
                />
                <RecPanel
                  condition={this.props.other}
                  title={this.props.otherRecommendationsTitle === undefined ?
                    T.translate(`recommendations.otherTitle.${this.props.language}`) :
                    this.props.otherRecommendationsTitle}
                  value={this.props.otherRecommendations === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.otherRecommendations}
                />
              </div>
            </div>

          </div>
        }
        <Tooltip
          for="#titleInfo"
          title={T.translate(`toolTip.goals.${this.props.language}`)}
        />
        <Tooltip
          for="#personalGoalInfo"
          title={T.translate(`toolTip.personalGoal.${this.props.language}`)}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    tiltFrequencyWeight: state.recommendationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.recommendationReducer.tiltLengthWeight,
    tiltAngleWeight: state.recommendationReducer.tiltAngleWeight,
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSwelling: state.recommendationReducer.reduceSwelling,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reducePain: state.recommendationReducer.reducePain,
    allowRest: state.recommendationReducer.allowRest,
    easeTransfers: state.recommendationReducer.easeTransfers,
    improveComfort: state.recommendationReducer.improveComfort,
    other: state.recommendationReducer.other,
    tiltAngleMoving: state.recommendationReducer.tiltAngleMoving,
    tiltAngleRest: state.recommendationReducer.tiltAngleRest,
    swellingRecommendation: state.recommendationReducer.swellingRecommendation,
    painRecommendation: state.recommendationReducer.painRecommendation,
    restRecommendation: state.recommendationReducer.restRecommendation,
    transferRecommendation: state.recommendationReducer.transferRecommendation,
    comfortRecommendation: state.recommendationReducer.comfortRecommendation,
    otherRecommendations: state.recommendationReducer.otherRecommendations,
    otherRecommendationsTitle: state.recommendationReducer.otherRecommendationsTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeReduceWeight: RecommendationActions.changeReduceWeight,
    changeReduceSwelling: RecommendationActions.changeReduceSwelling,
    changeReduceSlidingMoving: RecommendationActions.changeReduceSlidingMoving,
    changeReduceSlidingRest: RecommendationActions.changeReduceSlidingRest,
    changeReducePain: RecommendationActions.changeReducePain,
    changeAllowRest: RecommendationActions.changeAllowRest,
    changeEaseTransfers: RecommendationActions.changeEaseTransfers,
    changeImproveComfort: RecommendationActions.changeImproveComfort,
    changeOther: RecommendationActions.changeOther,
    changeTiltFrequencyWeight: RecommendationActions.changeTiltFrequencyWeight,
    changeTiltLengthWeight: RecommendationActions.changeTiltLengthWeight,
    changeTiltAngleWeight: RecommendationActions.changeTiltAngleWeight,
    changeTiltAngleMoving: RecommendationActions.changeTiltAngleMoving,
    changeTiltAngleRest: RecommendationActions.changeTiltAngleRest,
    reducePainRecommendation: RecommendationActions.reducePainRecommendation,
    reduceSwellingRecommendation: RecommendationActions.reduceSwellingRecommendation,
    allowRestRecommendation: RecommendationActions.allowRestRecommendation,
    easeTransfersRecommendation: RecommendationActions.easeTransfersRecommendation,
    improveComfortRecommendation: RecommendationActions.improveComfortRecommendation,
    otherRecommendation: RecommendationActions.otherRecommendation,
    otherRecommendationTitle: RecommendationActions.otherRecommendationTitle,
    changeTiltFrequencyGoal: GoalActions.changeTiltFrequencyGoal,
    changeTiltLengthGoal: GoalActions.changeTiltLengthGoal,
    changeTiltAngleGoal: GoalActions.changeTiltAngleGoal,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
