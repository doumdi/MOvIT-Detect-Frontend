import React, { Component } from 'react';
import { Slider } from 'primereact/components/slider/Slider';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoalActions } from '../redux/goalReducer';
import { T } from '../utilities/translator';

class Goal extends Component {
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
    profile: PropTypes.string.isRequired,
    changeTiltFrequencyGoal: PropTypes.func.isRequired,
    tiltFrequencyGoal: PropTypes.number.isRequired,
    changeTiltLengthGoal: PropTypes.func.isRequired,
    tiltLengthGoal: PropTypes.number.isRequired,
    tiltAngleGoal: PropTypes.number.isRequired,
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
    changeTiltAngleGoal: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      modifieGoal: false,
      maxSliderAngle: 90,
      swellingRecommendation: props.swellingRecommendation,
      painRecommendation: props.painRecommendation,
      restRecommendation: props.restRecommendation,
      transferRecommendation: props.transferRecommendation,
      comfortRecommendation: props.comfortRecommendation,
      otherRecommendations: props.otherRecommendations,
    };

    this.setMaxAngle();
  }

  setMaxAngle() {
    if (this.props.maxAngle) {
      this.state.maxSliderAngle = this.props.maxAngle;
    }
  }

  toggleEditing() {
    if (this.state.modifieGoal) {
      this.setState({ modifieGoal: false });
      // save goals data
    } else {
      this.setState({ modifieGoal: true });
    }
  }

  render() {
    /* eslint-disable global-require */
    const imagePath = require('../res/images/chair.png');
    /* eslint-enable global-require */
    const style = {
      bar: {
        paddingLeft: '5%',
        paddingRight: '5%',
      },
      bold: {
        fontWeight: 'bold',
      },
      bottom: {
        marginTop: '2em',
      },
      center: {
        textAlign: 'center',
      },
      container: {
        border: '1px solid #ddd',
        paddingBottom: '1em',
      },
      icons: {
        fontSize: 'large',
      },
      modifieButton: {
        padding: '5px',
        marginTop: '5px',
        marginBottom: '5px',
        backgroundColor: 'transparent',
        border: 0,
      },
      chair: {
        textAlign: 'center',
        marginTop: '1em',
      },
      panels: {
        marginBottom: '0px',
      },
      panelGroup: {
        height: '80em',
        maxHeight: '150em',
        overflowY: 'auto',
      },
    };

    return (
      <div>
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
          &&
          <h3 style={style.chair}>{T.translate(`goals.noRecommendations.${this.props.language}`)}</h3>
        }
        <div className="row" style={style.panelGroup}>
          <div className="col-sm-2" />
          <div className="col-sm-8">
            {this.props.reduceWeight
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="col-sm-6" style={style.container}>
                        <h4 style={style.center}>{T.translate(`goals.RecommendedGoals.${this.props.language}`)}</h4>
                        <div className="col-sm-12">
                          <span className="col-sm-6" style={style.bold}>
                            {T.translate(`goals.tiltFrequency.${this.props.language}`)}
                          </span>
                          <span className="col-sm-6" style={style.bold}>
                            {this.props.tiltFrequencyWeight} {T.translate(`time.min.${this.props.language}`)}
                          </span>
                        </div>
                        <div className="col-sm-12">
                          <span className="col-sm-6" style={style.bold}>
                            {T.translate(`goals.tiltLength.${this.props.language}`)}
                          </span>
                          <span className="col-sm-6" style={style.bold}>
                            {this.props.tiltLengthWeight} {T.translate(`time.min.${this.props.language}`)}
                          </span>
                        </div>
                        <div className="col-sm-12">
                          <span className="col-sm-6" style={style.bold}>
                            {T.translate(`goals.tiltAngle.${this.props.language}`)}
                          </span>
                          <span className="col-sm-6" style={style.bold}>
                            {this.props.tiltAngleWeight} &deg;
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-6" style={style.container}>
                        <div className="col-sm-2" />
                        <div className="col-sm-9">
                          <h4 style={style.center}>
                            {T.translate(`goals.personalGoals.${this.props.language}`)} &nbsp;
                            <i id="personalGoalInfo" className="fa fa-info-circle" />
                          </h4>
                        </div>
                        <div className="col-sm-1" >
                          {this.props.profile === 'user'
                            &&
                            <button style={style.modifieButton} onClick={() => this.toggleEditing()}>
                              {this.state.modifieGoal
                              ?
                                <i className="fa fa-check" style={style.icons} />
                              :
                                <i className="fa fa-edit" style={style.icons} />
                              }
                            </button>
                          }
                        </div>
                        {this.state.modifieGoal
                        ?
                          <div>
                            <div className="col-sm-12">
                              <span className="col-sm-4" style={style.bold}>
                                {T.translate(`goals.tiltFrequency.${this.props.language}`)}
                              </span>
                              <div className="col-sm-1" />
                              <Slider
                                className="col-sm-5" min={0} max={180}
                                onChange={e => this.props.changeTiltFrequencyGoal(e.value)} step={5}
                                value={this.props.tiltFrequencyGoal}
                              />
                              <span className="col-sm-2" style={style.bold}>
                                {this.props.tiltFrequencyGoal} {T.translate(`time.min.${this.props.language}`)}
                              </span>
                            </div>
                            <div className="col-sm-12">
                              <span className="col-sm-4" style={style.bold}>
                                {T.translate(`goals.tiltLength.${this.props.language}`)}
                              </span>
                              <div className="col-sm-1" />
                              <Slider
                                className="col-sm-5" min={0} max={30}
                                onChange={e => this.props.changeTiltLengthGoal(e.value)}
                                value={this.props.tiltLengthGoal}
                              />
                              <span className="col-sm-2" style={style.bold}>
                                {this.props.tiltLengthGoal} {T.translate(`time.min.${this.props.language}`)}
                              </span>
                            </div>
                            <div className="col-sm-12">
                              <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltAngle.${this.props.language}`)}</span>
                              <div className="col-sm-1" />
                              <Slider
                                className="col-sm-5" min={0} max={this.state.maxSliderAngle}
                                onChange={e => this.props.changeTiltAngleGoal(e.value)}
                                value={this.props.tiltAngleGoal}
                              />
                              <span className="col-sm-2" style={style.bold}>
                                {this.props.tiltAngleGoal} &deg;
                              </span>
                            </div>
                          </div>
                        :
                          <div>
                            <div className="col-sm-12">
                              <span className="col-sm-6" style={style.bold}>
                                {T.translate(`goals.tiltFrequency.${this.props.language}`)}
                              </span>
                              <span className="col-sm-6" style={style.bold}>
                                {this.props.tiltFrequencyGoal} {T.translate(`time.min.${this.props.language}`)}
                              </span>
                            </div>
                            <div className="col-sm-12">
                              <span className="col-sm-6" style={style.bold}>
                                {T.translate(`goals.tiltLength.${this.props.language}`)}
                              </span>
                              <span className="col-sm-6" style={style.bold}>
                                {this.props.tiltLengthGoal} {T.translate(`time.min.${this.props.language}`)}
                              </span>
                            </div>
                            <div className="col-sm-12">
                              <span className="col-sm-6" style={style.bold}>
                                {T.translate(`goals.tiltAngle.${this.props.language}`)}
                              </span>
                              <span className="col-sm-6" style={style.bold}>
                                {this.props.tiltAngleGoal} &deg;
                              </span>
                            </div>
                          </div>
                        }
                        <div className="col-sm-12" style={style.chair}>
                          <div className="col-sm-4" />
                          <div className="col-sm-4" >
                            <img
                              src={imagePath}
                              width="50"
                              height="50"
                              alt="chair"
                              style={{ transform: `rotate(-${this.props.tiltAngleGoal}deg)` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
            }
            {this.props.reduceSlidingMoving
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.slidingMoving.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                  {this.props.tiltAngleMoving} &deg; {T.translate(`goals.reduceSlidingMoving.${this.props.language}`)}
                </Panel.Body>
              </Panel>
            }
            {this.props.reduceSlidingRest
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.slidingRest.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
                  {this.props.tiltAngleRest} &deg; {T.translate(`goals.reduceSlidingRest.${this.props.language}`)}
                </Panel.Body>
              </Panel>
            }
            {this.props.reduceSwelling
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.state.swellingRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.swellingRecommendation}
                </Panel.Body>
              </Panel>
            }
            {this.props.reducePain
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.pain.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.state.painRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.painRecommendation}
                </Panel.Body>
              </Panel>
            }
            {this.props.allowRest
              &&
              <Panel style={style.panels}>
                <Panel.Heading>
                  <Panel.Title toggle>
                    <i className="fa fa-chevron-down" /> {T.translate(`recommendations.rest.${this.props.language}`)}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.state.restRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.restRecommendation}
                </Panel.Body>
              </Panel>
            }
            {this.props.easeTransfers
            &&
            <Panel style={style.panels}>
              <Panel.Heading>
                <Panel.Title toggle>
                  <i className="fa fa-chevron-down" /> {T.translate(`recommendations.transfer.${this.props.language}`)}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                {this.state.transferRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.transferRecommendation}
              </Panel.Body>
            </Panel>
            }
            {this.props.improveComfort
            &&
            <Panel style={style.panels}>
              <Panel.Heading>
                <Panel.Title toggle>
                  <i className="fa fa-chevron-down" /> {T.translate(`recommendations.comfort.${this.props.language}`)}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                {this.state.comfortRecommendation === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.state.comfortRecommendation}
              </Panel.Body>
            </Panel>
            }
            {this.props.other
            &&
            <Panel style={style.panels}>
              <Panel.Heading>
                <Panel.Title toggle>
                  <i className="fa fa-chevron-down" /> {this.props.otherRecommendationsTitle === undefined ?
                    T.translate(`recommendations.otherTitle.${this.props.language}`) :
                    this.props.otherRecommendationsTitle}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                {this.props.otherRecommendations === undefined ?
                    T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                    this.props.otherRecommendations}
              </Panel.Body>
            </Panel>
            }
          </div>
        </div>
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
    profile: state.applicationReducer.profile,
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
    swellingRecommendation: state.recommendationReducer.swellingRecommendation,
    painRecommendation: state.recommendationReducer.painRecommendation,
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
    changeTiltFrequencyGoal: GoalActions.changeTiltFrequencyGoal,
    changeTiltLengthGoal: GoalActions.changeTiltLengthGoal,
    changeTiltAngleGoal: GoalActions.changeTiltAngleGoal,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
