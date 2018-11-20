/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DailyAngleDistribution from './dailyAngleDistribution';
import DailySuccessTilt from './dailySuccessTilt';
import { T } from '../../../../utilities/translator';
import { IS_TABLET } from '../../../../redux/applicationReducer';


class DailyAngleResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      date: props.date,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
    }
  }

  render() {
    return (
      <div>
        {!IS_TABLET
          && (
          <div className="col-lg-2 leftMenu">
            <ul className="graphlist">
              <li className="graphLink"><a href="results/angle#dailyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
              <li className="graphLink"><a href="results/angle#dailyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
            </ul>
          </div>
          )
        }
        <div className=" col-lg-10 offset-lg-2 results resultsContainer">
          <div className="col-lg-8 offset-lg-1">
            <div>
              {this.state.date
              && (
              <div>
                <DailyAngleDistribution date={this.state.date} />
                <DailySuccessTilt date={this.state.date} />
              </div>
              )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(DailyAngleResults);
