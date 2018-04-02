import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Slider } from 'primereact/components/slider/Slider';
import { RecommendationActions } from '../redux/recommendationReducer';
import { GoalActions } from '../redux/goalReducer';
import { T } from '../index';

class Recommendation extends Component {
  static propTypes = {
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

  render() {
    const style = {
      height: '80vh',
      input: {
        paddingLeft: '0',
        marginBottom: '1em',
      },
      stickLeft: {
        paddingLeft: '0',
      },
      spacingTop: {
        paddingTop: '10',
      },
      bold: {
        fontWeight: 'bold',
      },
      linkNoStyle: {
        textDecoration: 'none',
        color: '#333',
      },
    };

    return (
      <div style={style} className="container">
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
              <div>
                <div className="col-sm-12">
                  <div className="col-sm-4">
                    <span className="col-sm-12">{T.translate(`recommendations.frequency.${this.props.language}`)}</span>
                  </div>
                  <Slider
                    className="col-sm-6"
                    min={0}
                    max={180}
                    value={this.props.tiltFrequencyWeight}
                    onChange={e => this.changeFrequencyGoal(e.value)} step={5}
                  />
                  <span className="col-sm-2">{this.props.tiltFrequencyWeight} min </span>
                </div>
                <div className="col-sm-12">
                  <div className="col-sm-4">
                    <span className="col-sm-12">{T.translate(`recommendations.duration.${this.props.language}`)}</span>
                  </div>
                  <Slider
                    className="col-sm-6"
                    min={0}
                    max={30}
                    value={this.props.tiltLengthWeight}
                    onChange={e => this.changeLengthGoal(e.value)}
                  />
                  <span className="col-sm-2" >{this.props.tiltLengthWeight} min </span>
                </div>
                <div className="col-sm-12">
                  <div className="col-sm-4">
                    <span className="col-sm-12">{T.translate(`recommendations.angle.${this.props.language}`)}</span>
                  </div>
                  <Slider
                    className="col-sm-6"
                    min={0}
                    max={this.state.maxSliderAngle}
                    value={this.props.tiltAngleWeight}
                    onChange={e => this.changeAngleGoal(e.value)}
                  />
                  <span className="col-sm-2">{this.props.tiltAngleWeight} &deg; </span>
                </div>
              </div>
            : null}
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="reduceMovingSlideCheck"
                label="Reduce sliding while moving"
                onChange={this.props.changeReduceSlidingMoving}
                checked={this.props.reduceSlidingMoving}
              />
              <label htmlFor="reduceMovingSlideCheck">{T.translate(`recommendations.slidingMoving.${this.props.language}`)}</label>
            </div>
          </div>
          {this.props.reduceSlidingMoving
            ?
              <div className="col-sm-12">
                <div className="col-sm-4">
                  <span className="col-sm-12">{T.translate(`recommendations.angle.${this.props.language}`)}</span>
                </div>
                <Slider
                  className="col-sm-6"
                  min={0} max={this.state.maxSliderAngle}
                  onChange={e => this.props.changeTiltAngleMoving(e.value)}
                  value={this.props.tiltAngleMoving}
                />
                <span className="col-sm-2">{this.props.tiltAngleMoving} &deg; </span>
              </div>
            : null}
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="reduceRestSlideCheck"
                label="Reduce sliding at rest"
                onChange={this.props.changeReduceSlidingRest}
                checked={this.props.reduceSlidingRest}
              />
              <label htmlFor="reduceRestSlideCheck">{T.translate(`recommendations.slidingRest.${this.props.language}`)}</label>
            </div>
          </div>
          {this.props.reduceSlidingRest
            ?
              <div className="col-sm-12">
                <div className="col-sm-4">
                  <span className="col-sm-12">{T.translate(`recommendations.angle.${this.props.language}`)}</span>
                </div>
                <Slider
                  className="col-sm-6"
                  min={0}
                  max={this.state.maxSliderAngle}
                  value={this.props.tiltAngleRest}
                  onChange={e => this.props.changeTiltAngleRest(e.value)}
                />
                <span className="col-sm-2">{this.props.tiltAngleRest} &deg; </span>
              </div>
            : null}
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="reduceSwellingCheck"
                label="Reduce swelling"
                onChange={this.props.changeReduceSwelling}
                checked={this.props.reduceSwelling}
              />
              <label htmlFor="reduceSwellingCheck">{T.translate(`recommendations.reduceSwelling.${this.props.language}`)}</label>
            </div>
            {this.props.reduceSwelling
            ?
              <div className="col-sm-7" style={style.input}>
                <InputText
                  id="reduceSwellingRec" type="text" className="form-control"
                  onChange={e => this.props.reduceSwellingRecommendation(e.target.value)}
                  value={this.props.swellingRecommendation}
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="reducePainCheck"
                label="Reduce the pain"
                onChange={this.props.changeReducePain}
                checked={this.props.reducePain}
              />
              <label htmlFor="reducePainCheck">{T.translate(`recommendations.pain.${this.props.language}`)}</label>
            </div>
            {this.props.reducePain
            ?
              <div className="col-sm-7" style={style.input}>
                <InputText
                  id="reducePainRec" type="text" className="form-control"
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                  onChange={e => this.props.reducePainRecommendation(e.target.value)}
                  value={this.props.painRecommendation}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="allowRestCheck"
                label="Allowing rest"
                onChange={this.props.changeAllowRest}
                checked={this.props.allowRest}
              />
              <label htmlFor="allowRestCheck">{T.translate(`recommendations.rest.${this.props.language}`)}</label>
            </div>
            {this.props.allowRest
            ?
              <div className="col-sm-7" style={style.input}>
                <InputText
                  id="allowRestRec" type="text" className="form-control"
                  onChange={e => this.props.allowRestRecommendation(e.target.value)}
                  value={this.props.restRecommendation}
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="easeTransfersCheck"
                label="Ease transfers"
                onChange={this.props.changeEaseTransfers}
                checked={this.props.easeTransfers}
              />
              <label htmlFor="easeTransfersCheck">{T.translate(`recommendations.transfer.${this.props.language}`)}</label>
            </div>
            {this.props.easeTransfers
            ?
              <div className="col-sm-7" style={style.input}>
                <InputText
                  id="easeTransfersRec" type="text" className="form-control"
                  onChange={e => this.props.easeTransfersRecommendation(e.target.value)}
                  value={this.props.transferRecommendation}
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox
                inputId="improveComfortCheck"
                label="Improve comfort"
                onChange={this.props.changeImproveComfort} checked={this.props.improveComfort}
              />
              <label htmlFor="improveComfortCheck">{T.translate(`recommendations.comfort.${this.props.language}`)}</label>
            </div>
            {this.props.improveComfort
            ?
              <div className="col-sm-7" style={style.input}>
                <InputText
                  id="improveComfortRec" type="text" className="form-control"
                  onChange={e => this.props.improveComfortRecommendation(e.target.value)}
                  value={this.props.comfortRecommendation}
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12" style={style.spacingTop}>
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="otherCheck" label="Other" onChange={this.props.changeOther} checked={this.props.other} />
              <label htmlFor="otherCheck">{T.translate(`recommendations.other.${this.props.language}`)}</label>
            </div>
            {this.props.other
            ?
              <div>
                <div className="col-sm-7" style={style.input}>
                  <InputText
                    id="otherRec" type="text" className="form-control"
                    onChange={e => this.props.otherRecommendationTitle(e.target.value)}
                    placeholder={T.translate(`recommendations.otherTitle.${this.props.language}`)}
                    value={this.props.otherRecommendationsTitle}
                  />
                </div>
                <div className="col-sm-7 col-sm-offset-4" style={style.input}>
                  <InputText
                    id="otherRec" type="text" className="form-control"
                    onChange={e => this.props.otherRecommendation(e.target.value)}
                    placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                    value={this.props.otherRecommendations}
                  />
                </div>
              </div>
            : null}
          </div>
        </div>
        <div className="col-sm-12" style={style.spacingTop}>
          <div className="col-sm-10 text-right">
            <button type="submit" className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
            &nbsp;
            <Link to="goals" style={style.linkNoStyle}>
              <button className="btn btn-lg">
                {T.translate(`save.${this.props.language}`)}
              </button>
            </Link>
          </div>
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
    tiltFrequencyGoal: state.goalReducer.tiltFrequencyGoal,
    tiltLengthGoal: state.goalReducer.tiltLengthGoal,
    tiltAngleGoal: state.goalReducer.tiltAngleGoal,
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
