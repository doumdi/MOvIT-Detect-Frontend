import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { GoalActions } from '../redux/goalReducer';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import TiltSliders from './tiltSliders';
import TiltLabels from './tiltLabels';

class PressureRecPanel extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    maxAngle: PropTypes.number,
    reduceWeight: PropTypes.bool.isRequired,
    tiltFrequencyWeight: PropTypes.number.isRequired,
    tiltLengthWeight: PropTypes.number.isRequired,
    tiltAngleWeight: PropTypes.number.isRequired,
    tiltFrequencyGoal: PropTypes.number.isRequired,
    tiltLengthGoal: PropTypes.number.isRequired,
    tiltAngleGoal: PropTypes.number.isRequired,
    changeTiltFrequencyGoal: PropTypes.func.isRequired,
    changeTiltLengthGoal: PropTypes.func.isRequired,
    changeTiltAngleGoal: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      modifieGoal: false,
      maxSliderAngle: 90,
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
      axios.post(`${URL}goal`, {
        tiltFrequencyGoal: this.state.tiltFrequencyGoal,
        tiltLengthGoal: this.state.tiltLengthGoal,
        tiltAngleGoal: this.state.tiltAngleGoal,
      })
    .then(console.log)
    .catch(console.log);
    } else {
      this.setState({ modifieGoal: true });
    }
  }

  render() {
    const imagePath = require('../res/images/chair.png');
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
                    <TiltLabels
                      tiltFrequecy={this.props.tiltFrequencyWeight}
                      tiltLength={this.props.tiltLengthWeight}
                      tiltAngle={this.props.tiltAngleWeight}
                    />
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
                      <TiltSliders
                        tiltFrequecy={this.props.tiltFrequencyGoal}
                        tiltLength={this.props.tiltLengthGoal}
                        tiltAngle={this.props.tiltAngleGoal}
                        maxAngle={this.state.maxSliderAngle}
                        onFrequencyChange={this.props.changeTiltFrequencyGoal}
                        onLengthChange={this.props.changeTiltLengthGoal}
                        onAngleChange={this.props.changeTiltAngleGoal}
                      />
                    :
                      <TiltLabels
                        tiltFrequecy={this.props.tiltFrequencyGoal}
                        tiltLength={this.props.tiltLengthGoal}
                        tiltAngle={this.props.tiltAngleGoal}
                      />
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
    tiltFrequencyWeight: state.recommendationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.recommendationReducer.tiltLengthWeight,
    tiltAngleWeight: state.recommendationReducer.tiltAngleWeight,
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

export default connect(mapStateToProps, mapDispatchToProps)(PressureRecPanel);
