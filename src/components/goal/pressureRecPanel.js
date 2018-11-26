/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoalActions } from '../../redux/goalReducer';
import { T } from '../../utilities/translator';
import TiltLabels from './tiltLabels';
import TiltSlidersCard from './tiltSlidersCard';
import { URL } from '../../redux/applicationReducer';
import { post } from '../../utilities/secureHTTP';
import { SEC_IN_MIN } from '../../utilities/constants';

class PressureRecPanel extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
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

    this.toggleEditing = this.toggleEditing.bind(this);
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
      post(`${URL}goal`, {
        tiltFrequency: this.props.tiltFrequencyGoal * SEC_IN_MIN,
        tiltLength: this.props.tiltLengthGoal * SEC_IN_MIN,
        tiltAngle: this.props.tiltAngleGoal,
      });
    } else {
      this.setState({ modifieGoal: true });
    }
  }

  render() {
    return (
      <div>
        {this.props.reduceWeight
          && (
          <div className="row">
            <div className="col-12">
              {this.state.modifieGoal
                ? (
                  <TiltSlidersCard
                    id="reduceWeight"
                    title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                    tiltFrequecy={this.props.tiltFrequencyGoal}
                    tiltLength={this.props.tiltLengthGoal}
                    tiltAngle={this.props.tiltAngleGoal}
                    maxAngle={this.state.maxSliderAngle}
                    onFrequencyChange={this.props.changeTiltFrequencyGoal}
                    onLengthChange={this.props.changeTiltLengthGoal}
                    onAngleChange={this.props.changeTiltAngleGoal}
                    modifiable={this.props.profile === 'user'}
                    onModifie={this.toggleEditing}
                    tooltip={T.translate(`recommendations.reduceWeight.recPanel.tooltip.${this.props.language}`)}
                  />
                )
                : (
                  <TiltLabels
                    id="reduceWeight"
                    title={T.translate(`recommendations.reduceWeight.${this.props.language}`)}
                    tiltFrequecy={this.props.tiltFrequencyGoal}
                    tiltLength={this.props.tiltLengthGoal}
                    tiltAngle={this.props.tiltAngleGoal}
                    modifiable={this.props.profile === 'user'}
                    onModifie={this.toggleEditing}
                    tooltip={T.translate(`recommendations.reduceWeight.recPanel.tooltip.${this.props.language}`)}
                  />
                )}
            </div>
          </div>
          )
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
