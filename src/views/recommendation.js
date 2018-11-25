/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { get, post } from '../utilities/secureHTTP';
import AngleRecommendation from '../components/recommendation/angleRecommendation';
import ErrorMessage from '../components/shared/errorMessage';
import { GoalActions } from '../redux/goalReducer';
import Loading from '../components/shared/loading';
import OtherRecommendation from '../components/recommendation/otherRecommendation';
import { RecommendationActions } from '../redux/recommendationReducer';
import SubmitButtons from '../components/shared/submitButtons';
import { T } from '../utilities/translator';
import TextRecommendation from '../components/recommendation/textRecommendation';
import TiltSliders from '../components/shared/tiltSliders';
import { URL } from '../redux/applicationReducer';

class Recommendation extends Component {
  static propTypes = {
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
    reduceSlidingMoving: PropTypes.bool.isRequired,
    tiltAngleMoving: PropTypes.number.isRequired,
    tiltAngleRest: PropTypes.number.isRequired,
    reduceSwelling: PropTypes.bool.isRequired,
    reducePain: PropTypes.bool.isRequired,
    allowRest: PropTypes.bool.isRequired,
    easeTransfers: PropTypes.bool.isRequired,
    improveComfort: PropTypes.bool.isRequired,
    other: PropTypes.bool.isRequired,
    otherRecommendationsTitle: PropTypes.string,
    reduceSlidingRest: PropTypes.bool.isRequired,
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
      maxSliderAngle: 90,
      isLoaded: false,
      hasErrors: false,
    };

    this.load();
    this.setMaxAngle();
  }

  setMaxAngle() {
    if (this.props.maxAngle) {
      this.state.maxSliderAngle = this.props.maxAngle;
    }
  }

  async load() {
    try {
      const response = await get(`${URL}recommandation`);
      this.mapData(response.data);
      this.setState({ isLoaded: true });
    } catch (error) {
      console.log(error);
      this.setState({ hasErrors: true });
    }
  }

  mapData(response) {
    const self = this;
    return new Promise(
      ((resolve) => {
        if (response.reduceWeight) {
          self.props.changeReduceWeight(true);
          self.props.changeTiltFrequencyWeight(response.reduceWeight.tiltFrequency);
          self.props.changeTiltLengthWeight(response.reduceWeight.tiltLength);
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

  save() {
    const data = {
      reduceSwelling: this.props.swellingRecommendation,
      reducePain: this.props.painRecommendation,
    };

    if (this.props.reduceWeight) {
      data.reduceWeight = {
        tiltFrequency: this.props.tiltFrequencyWeight * 60,
        tiltLength: this.props.tiltLengthWeight * 60,
        tiltAngle: this.props.tiltAngleWeight,
      };
    }
    if (this.props.reduceSlidingMoving) {
      data.reduceSlidingMoving = this.props.tiltAngleMoving;
    }
    if (this.props.reduceSlidingRest) {
      data.reduceSlidingRest = this.props.tiltAngleRest;
    }
    if (this.props.allowRest) {
      data.allowRest = this.props.restRecommendation;
    }
    if (this.props.easeTransfers) {
      data.easeTransfers = this.props.transferRecommendation;
    }
    if (this.props.improveComfort) {
      data.improveComfort = this.props.comfortRecommendation;
    }
    if (this.props.other) {
      data.other = {
        title: this.props.otherRecommendationsTitle,
        value: this.props.otherRecommendations,
      };
    }

    post(`${URL}goal`, data.reduceWeight);
    post(`${URL}recommandation`, data);
    this.props.history.push('/goals');
  }

  cancel() {
    console.log('clear all fields');
  }

  changeTitlFrequency(value) {
    this.props.changeTiltFrequencyWeight(value);
    this.props.changeTiltFrequencyGoal(value);
  }

  changeTiltLength(value) {
    this.props.changeTiltLengthWeight(value);
    this.props.changeTiltLengthGoal(value);
  }

  changeTiltAngle(value) {
    this.props.changeTiltAngleWeight(value);
    this.props.changeTiltAngleGoal(value);
  }

  render() {
    if (!this.state.isLoaded) {
      return <Loading key="loading" />;
    }
    return (
      <div className="mt-5">
        <div className="container">
          <center>
            <h2>{T.translate(`recommendations.${this.props.language}`)}</h2>
          </center>
          <legend className="text-center header">
            <h4>{T.translate(`recommendations.recommendationsText.${this.props.language}`)}</h4>
          </legend>
          {this.state.hasErrors
            ? <ErrorMessage />
            : (
              <div>
                <div className="row pl-3">
                  <div className="col-11 pl-0">
                    <Checkbox
                      inputId="reduceWeightCheck"
                      label="Reduce weight"
                      onChange={e => this.props.changeReduceWeight(e.checked)}
                      checked={this.props.reduceWeight}
                    />
                    <label htmlFor="reduceWeightCheck" id="test">{T.translate(`recommendations.reduceWeight.${this.props.language}`)}</label>
                    <i id="reduceWeightInfo" className="fa fa-info-circle pl-2" />
                    <Tooltip
                      for="#reduceWeightInfo"
                      title={T.translate(`recommendations.reduceWeight.tooltip.${this.props.language}`)}
                    />
                    {this.props.reduceWeight
                      ? (
                        <TiltSliders
                          tiltFrequecy={this.props.tiltFrequencyWeight}
                          tiltLength={this.props.tiltLengthWeight}
                          tiltAngle={this.props.tiltAngleWeight}
                          maxAngle={this.state.maxSliderAngle}
                          onFrequencyChange={this.changeTitlFrequency.bind(this)}
                          onLengthChange={this.changeTiltLength.bind(this)}
                          onAngleChange={this.changeTiltAngle.bind(this)}
                        />
                      )
                      : null}
                  </div>
                </div>
                <AngleRecommendation
                  id="slidingMoving"
                  recActive={this.props.reduceSlidingMoving}
                  title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
                  maxAngle={this.state.maxSliderAngle}
                  value={this.props.tiltAngleMoving}
                  onChangeActive={this.props.changeReduceSlidingMoving}
                  onChangeValue={this.props.changeTiltAngleMoving}
                  tooltip={T.translate(`recommendations.slidingMoving.tooltip.${this.props.language}`)}
                />
                <AngleRecommendation
                  id="slidingRest"
                  recActive={this.props.reduceSlidingRest}
                  title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
                  maxAngle={this.state.maxSliderAngle}
                  value={this.props.tiltAngleRest}
                  onChangeActive={this.props.changeReduceSlidingRest}
                  onChangeValue={this.props.changeTiltAngleRest}
                  tooltip={T.translate(`recommendations.slidingRest.tooltip.${this.props.language}`)}
                />
                <TextRecommendation
                  id="reduceSwelling"
                  onChangeActive={this.props.changeReduceSwelling}
                  recActive={this.props.reduceSwelling}
                  title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
                  value={this.props.swellingRecommendation}
                  onChangeValue={this.props.reduceSwellingRecommendation}
                  tooltip={T.translate(`recommendations.reduceSwelling.tooltip.${this.props.language}`)}
                />
                <TextRecommendation
                  id="reducePain"
                  onChangeActive={this.props.changeReducePain}
                  recActive={this.props.reducePain}
                  title={T.translate(`recommendations.reducePain.${this.props.language}`)}
                  value={this.props.restRecommendation}
                  onChangeValue={this.props.allowRestRecommendation}
                  tooltip={T.translate(`recommendations.reducePain.tooltip.${this.props.language}`)}
                />
                <TextRecommendation
                  id="allowRest"
                  onChangeActive={this.props.changeAllowRest}
                  recActive={this.props.allowRest}
                  title={T.translate(`recommendations.rest.${this.props.language}`)}
                  value={this.props.painRecommendation}
                  onChangeValue={this.props.reducePainRecommendation}
                  tooltip={T.translate(`recommendations.rest.tooltip.${this.props.language}`)}
                />
                <TextRecommendation
                  id="easeTransfer"
                  onChangeActive={this.props.changeEaseTransfers}
                  recActive={this.props.easeTransfers}
                  title={T.translate(`recommendations.transfer.${this.props.language}`)}
                  value={this.props.transferRecommendation}
                  onChangeValue={this.props.easeTransfersRecommendation}
                  tooltip={T.translate(`recommendations.transfer.tooltip.${this.props.language}`)}
                />
                <TextRecommendation
                  id="improveComfort"
                  onChangeActive={this.props.changeImproveComfort}
                  recActive={this.props.improveComfort}
                  title={T.translate(`recommendations.comfort.${this.props.language}`)}
                  value={this.props.comfortRecommendation}
                  onChangeValue={this.props.improveComfortRecommendation}
                  tooltip={T.translate(`recommendations.comfort.tooltip.${this.props.language}`)}
                />
                <OtherRecommendation
                  id="other"
                  onChangeActive={this.props.changeOther}
                  recActive={this.props.other}
                  title={T.translate(`recommendations.other.${this.props.language}`)}
                  recTitle={this.props.otherRecommendationsTitle}
                  value={this.props.otherRecommendations}
                  onChangeValue={this.props.otherRecommendation}
                  onChangeRecTitle={this.props.otherRecommendationTitle}
                  tooltip={T.translate(`recommendations.other.tooltip.${this.props.language}`)}
                />
                <SubmitButtons
                  onSave={this.save.bind(this)}
                  onCancel={this.cancel}
                />
              </div>
            )
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSwelling: state.recommendationReducer.reduceSwelling,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reducePain: state.recommendationReducer.reducePain,
    allowRest: state.recommendationReducer.allowRest,
    easeTransfers: state.recommendationReducer.easeTransfers,
    improveComfort: state.recommendationReducer.improveComfort,
    other: state.recommendationReducer.other,
    tiltFrequencyWeight: state.recommendationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.recommendationReducer.tiltLengthWeight,
    tiltAngleWeight: state.recommendationReducer.tiltAngleWeight,
    tiltAngleMoving: state.recommendationReducer.tiltAngleMoving,
    tiltAngleRest: state.recommendationReducer.tiltAngleRest,
    painRecommendation: state.recommendationReducer.painRecommendation,
    swellingRecommendation: state.recommendationReducer.swellingRecommendation,
    restRecommendation: state.recommendationReducer.restRecommendation,
    transferRecommendation: state.recommendationReducer.transferRecommendation,
    comfortRecommendation: state.recommendationReducer.comfortRecommendation,
    otherRecommendations: state.recommendationReducer.otherRecommendations,
    otherRecommendationsTitle: state.recommendationReducer.otherRecommendationsTitle,
    maxAngle: state.configurationReducer.maxAngle,
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
