import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Slider } from 'primereact/components/slider/Slider';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';

class Recommendation extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      maxSliderAngle: 90
    };

    this.setMaxAngle();
  }

  setMaxAngle() {
    if (this.props.maxAngle) {
      this.state.maxSliderAngle = this.props.maxAngle;
    }
  }

  render() {
    const style = {
      height: '80vh',
      input: {
        paddingLeft: '0',
        marginBottom: '1em'
      },
      stickLeft: {
        paddingLeft: '0'
      },
      spacingTop: {
        paddingTop: '10'
      },
      bold: {
        fontWeight: 'bold'
      },
      linkNoStyle: {
        textDecoration: 'none',
        color: '#333'
      }
    };

    return (
      <div style={style}>
        <center><h2>{T.translate(`recommendations.${this.props.language}`)}</h2></center>
        <legend className="text-center header"><h4>{T.translate(`recommendations.recommendationsText.${this.props.language}`)}</h4></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
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
                    onChange={(e) => this.props.changeTiltFrequencyWeight(e.value)} step={5}
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
                    onChange={(e) => this.props.changeTiltLengthWeight(e.value)}
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
                    onChange={(e) => this.props.changeTiltAngleWeight(e.value)}
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
                  onChange={(e) => this.props.changeTiltAngleMoving(e.value)}
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
                  onChange={(e) => this.props.changeTiltAngleRest(e.value)}
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
                  onChange={(e) => this.props.reduceSwellingRecommendation(e.target.value)}
                  value={this.props.swellingRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.swellingRecommendation}
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
                  placeholder={T.translate(`recommendations.pain.recommendation.${this.props.language}`)}
                  onChange={(e) => this.props.reducePainRecommendation(e.target.value)}
                  value={this.props.painRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.painRecommendation}
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
                  onChange={(e) => this.props.allowRestRecommendation(e.target.value)}
                  value={this.props.restRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.restRecommendation}
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
                  onChange={(e) => this.props.easeTransfersRecommendation(e.target.value)}
                  value={this.props.transferRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.transferRecommendation}
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
                  onChange={(e) => this.props.improveComfortRecommendation(e.target.value)}
                  value={this.props.comfortRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.comfortRecommendation}
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
                    onChange={(e) => this.props.otherRecommendationTitle(e.target.value)}
                    value={this.props.otherRecommendationsTitle === undefined ?
                      T.translate(`recommendations.otherTitle.${this.props.language}`) :
                      this.props.otherRecommendationsTitle}
                  />
                </div>
                <div className="col-sm-7 col-sm-offset-4" style={style.input}>
                  <InputText
                    id="otherRec" type="text" className="form-control"
                    onChange={(e) => this.props.otherRecommendation(e.target.value)}
                    value={this.props.otherRecommendations === undefined ?
                      T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                      this.props.otherRecommendations}
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
    maxAngle: state.applicationReducer.maxAngle
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
    otherRecommendationTitle: ApplicationActions.otherRecommendationTitle
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
