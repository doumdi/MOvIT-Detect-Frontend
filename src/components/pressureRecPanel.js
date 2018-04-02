import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';

class PressureRecPanel extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    maxAngle: PropTypes.number.isRequired,
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
    reduceWeight: state.applicationReducer.reduceWeight,
    tiltFrequencyWeight: state.applicationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.applicationReducer.tiltLengthWeight,
    tiltAngleWeight: state.applicationReducer.tiltAngleWeight,
    maxAngle: state.applicationReducer.maxAngle,
    tiltFrequencyGoal: state.applicationReducer.tiltFrequencyGoal,
    tiltLengthGoal: state.applicationReducer.tiltLengthGoal,
    tiltAngleGoal: state.applicationReducer.tiltAngleGoal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeTiltFrequencyGoal: ApplicationActions.changeTiltFrequencyGoal,
    changeTiltLengthGoal: ApplicationActions.changeTiltLengthGoal,
    changeTiltAngleGoal: ApplicationActions.changeTiltAngleGoal,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PressureRecPanel);
