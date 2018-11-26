/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ErrorMessage from '../components/shared/errorMessage';
import { GoalActions } from '../redux/goalReducer';
import Loading from '../components/shared/loading';
import PressureRecPanel from '../components/goal/pressureRecPanel';
import RecPanel from '../components/goal/recPanel';
import { RecommendationActions } from '../redux/recommendationReducer';
import { T } from '../utilities/translator';
import TiltLabels from '../components/goal/tiltLabels';
import { URL } from '../redux/applicationReducer';
import { get } from '../utilities/secureHTTP';
import { SEC_IN_MIN } from '../utilities/constants';

class Goal extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
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
    otherRecommendationsTitle: PropTypes.string,
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
      isLoaded: false,
      hasErrors: false,
    };
    this.load();
  }

  async load() {
    try {
      await this.loadGoals();
      await this.loadRecommendations();
      this.setState({ isLoaded: true });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  async loadGoals() {
    const response = await get(`${URL}goal`);
    await this.mapGoalData(response.data);
  }

  async loadRecommendations() {
    if (this.props.reduceWeight) { // most important rec, if this is not existing, reload recs
      return;
    }
    const response = await get(`${URL}recommandation`);
    await this.mapRecData(response.data);
  }

  mapGoalData(response) {
    const self = this;
    return new Promise(
      ((resolve) => {
        self.props.changeTiltAngleGoal(response.tiltAngle);
        self.props.changeTiltFrequencyGoal(response.tiltFrequency / SEC_IN_MIN);
        self.props.changeTiltLengthGoal(response.tiltLength / SEC_IN_MIN);
        resolve();
      }),
    );
  }

  mapRecData(response) {
    const self = this;
    return new Promise(
      ((resolve) => {
        if (response.reduceWeight) {
          self.props.changeReduceWeight(true);
          self.props.changeTiltFrequencyWeight(response.reduceWeight.tiltFrequency / SEC_IN_MIN);
          self.props.changeTiltLengthWeight(response.reduceWeight.tiltLength / SEC_IN_MIN);
          self.props.changeTiltAngleWeight(response.reduceWeight.tiltAngle);
        }
        if (response.reduceSlidingMoving) {
          self.props.changeReduceSlidingMoving(true);
          self.props.changeTiltAngleMoving(response.reduceSlidingMoving);
        }
        if (response.reduceSlidingRest) {
          self.props.changeReduceSlidingRest(true);
          self.props.changeTiltAngleRest(response.reduceSlidingRest);
        }
        if (response.reduceSwelling) {
          self.props.changeReduceSwelling(true);
          self.props.reduceSwellingRecommendation(response.reduceSwelling);
        }
        if (response.reducePain) {
          self.props.changeReducePain(true);
          self.props.reducePainRecommendation(response.reducePain);
        }
        if (response.allowRest) {
          self.props.changeAllowRest(true);
          self.props.allowRestRecommendation(response.allowRest);
        }
        if (response.easeTransfers) {
          self.props.changeEaseTransfers(true);
          self.props.easeTransfersRecommendation(response.easeTransfers);
        }
        if (response.improveComfort) {
          self.props.changeImproveComfort(true);
          self.props.improveComfortRecommendation(response.improveComfort);
        }
        if (response.other) {
          self.props.changeOther(true);
          self.props.otherRecommendationTitle(response.other.title);
          self.props.otherRecommendation(response.other.value);
        }
        resolve();
      }),
    );
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

    if (!this.state.isLoaded) {
      return <Loading key="loading" />;
    }
    return (
      <div>
        <legend className="text-center header mt-5 mb-4">
          <h2>
            {T.translate(`goals.${this.props.language}`)}
              &nbsp;
            <i id="titleInfo" className="fa fa-info-circle" />
          </h2>
        </legend>
        {this.state.hasErrors
          ? <ErrorMessage />
          : (
            <div>
              {!this.props.reduceWeight && !this.props.reduceSwelling
                  && !this.props.reduceSlidingMoving && !this.props.reducePain
                  && !this.props.allowRest && !this.props.easeTransfers
                  && !this.props.improveComfort && !this.props.other
                ? <h3 style={style.chair}>{T.translate(`goals.noRecommendations.${this.props.language}`)}</h3>
                : (
                  <div className="row" style={style.panelGroup}>
                    <div className="col-12 col-md-8 offset-md-2">
                      <h3 className="ml-2 text-md-left text-center">
                        {T.translate(`goals.personalGoals.${this.props.language}`)}
                        {' '}
                        <i id="personalGoalInfo" className="fa fa-info-circle" />
                      </h3>
                      <PressureRecPanel />
                      <h3 className="ml-2 text-md-left text-center">{T.translate(`goals.recommendedGoals.${this.props.language}`)}</h3>
                      {this.props.reduceWeight
                      && (
                        <TiltLabels
                          title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                          tiltFrequecy={this.props.tiltFrequencyWeight}
                          tiltLength={this.props.tiltLengthWeight}
                          tiltAngle={this.props.tiltAngleWeight}
                        />
                      )
                      }
                      <div className="d-flex flex-wrap">
                        <RecPanel
                          id="slidingMovingRecPanel"
                          condition={this.props.reduceSlidingMoving}
                          title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
                          value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                        ${this.props.tiltAngleMoving}°
                        ${T.translate(`goals.reduceSlidingMoving.${this.props.language}`)}`}
                          tooltip={T.translate(`recommendations.slidingMoving.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="slidingRestRecPanel"
                          condition={this.props.reduceSlidingRest}
                          title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
                          value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                        ${this.props.tiltAngleRest}°
                        ${T.translate(`goals.reduceSlidingRest.${this.props.language}`)}`}
                          tooltip={T.translate(`recommendations.slidingRest.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="reduceSwelling"
                          condition={this.props.reduceSwelling}
                          title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
                          value={this.state.swellingRecommendation === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.state.swellingRecommendation}
                          tooltip={T.translate(`recommendations.reduceSwelling.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="reducePain"
                          condition={this.props.reducePain}
                          title={T.translate(`recommendations.pain.${this.props.language}`)}
                          value={this.state.painRecommendation === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.state.painRecommendation}
                          tooltip={T.translate(`recommendations.reducePain.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="allowRest"
                          condition={this.props.allowRest}
                          title={T.translate(`recommendations.rest.${this.props.language}`)}
                          value={this.state.restRecommendation === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.state.restRecommendation}
                          tooltip={T.translate(`recommendations.rest.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="easeTransfer"
                          condition={this.props.easeTransfers}
                          title={T.translate(`recommendations.transfer.${this.props.language}`)}
                          value={this.state.transferRecommendation === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.state.transferRecommendation}
                          tooltip={T.translate(`recommendations.transfer.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          id="improveComfort"
                          condition={this.props.improveComfort}
                          title={T.translate(`recommendations.comfort.${this.props.language}`)}
                          value={this.state.comfortRecommendation === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.state.comfortRecommendation}
                          tooltip={T.translate(`recommendations.comfort.recPanel.tooltip.${this.props.language}`)}
                        />
                        <RecPanel
                          condition={this.props.other}
                          title={this.props.otherRecommendationsTitle === undefined
                            ? T.translate(`recommendations.otherTitle.${this.props.language}`)
                            : this.props.otherRecommendationsTitle}
                          value={this.props.otherRecommendations === undefined
                            ? T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)
                            : this.props.otherRecommendations}
                        />
                      </div>
                    </div>
                  </div>
                )
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
          )
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
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
