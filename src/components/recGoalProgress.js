
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import { T } from '../index';


class RecGoalProgress extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    goalValue: PropTypes.number,
    recValue: PropTypes.number,
  }

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    return (
      <div>
        {this.props.condition &&
          <div>
            <hr />
            <h2 style={style.center}>{this.props.title}</h2>

            <h4>{T.translate(`dailyResults.personal.${this.props.language}`)}</h4>
            <ProgressBar value={this.props.goalValue} />
            <p style={style.center}>
              {T.translate(`dailyResults.personal.description.${this.props.language}`,
              { percent: this.props.goalValue })}
            </p>
            <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
            <ProgressBar value={this.props.recValue} />
            <p style={style.center}>
              {T.translate(`dailyResults.recommended.description.${this.props.language}`,
              { percent: this.props.recValue })}
            </p>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(RecGoalProgress);
