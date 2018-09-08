/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { GoalActions } from '../redux/goalReducer';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import TiltSliders from './tiltSliders';
import TiltLabels from './tiltLabels';

class PressureRecPanel extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    // profile: PropTypes.string.isRequired,
    maxAngle: PropTypes.number,
    reduceWeight: PropTypes.bool.isRequired,
    tiltFrequencyGoal: PropTypes.number.isRequired,
    tiltLengthGoal: PropTypes.number.isRequired,
    tiltAngleGoal: PropTypes.number.isRequired,
    changeTiltFrequencyGoal: PropTypes.func.isRequired,
    changeTiltLengthGoal: PropTypes.func.isRequired,
    changeTiltAngleGoal: PropTypes.func.isRequired,
  };

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
    // const style = {
    //   bar: {
    //     paddingLeft: '5%',
    //     paddingRight: '5%',
    //   },
    //   bold: {
    //     fontWeight: 'bold',
    //   },
    //   bottom: {
    //     marginTop: '2em',
    //   },
    //   center: {
    //     textAlign: 'center',
    //   },
    //   container: {
    //     border: '1px solid #ddd',
    //     paddingBottom: '1em',
    //   },
    //   icons: {
    //     fontSize: 'large',
    //   },
    //   modifieButton: {
    //     padding: '5px',
    //     marginTop: '5px',
    //     marginBottom: '5px',
    //     backgroundColor: 'transparent',
    //     border: 0,
    //   },
    //   chair: {
    //     textAlign: 'center',
    //     marginTop: '1em',
    //   },
    //   panels: {
    //     marginBottom: '0px',
    //   },
    //   panelGroup: {
    //     height: '80em',
    //     maxHeight: '150em',
    //     overflowY: 'auto',
    //   },
    // };

    return (
      <div>
        {this.props.reduceWeight
          &&
            <div className="row">
              <div className="col-sm-12">
                {!this.state.modifieGoal
                ?
                  <TiltSliders
                    title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
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
                    title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                    tiltFrequecy={this.props.tiltFrequencyGoal}
                    tiltLength={this.props.tiltLengthGoal}
                    tiltAngle={this.props.tiltAngleGoal}
                  />
                }
              </div>
            </div>
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
