/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MonthlyAngleDistribution from './monthlyAngleDistribution';
import MonthlySuccessTilt from './monthlySuccessTilt';
import { T } from '../../../../utilities/translator';
import { IS_TABLET } from '../../../../redux/applicationReducer';


class MonthlyAngleResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    month: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      month: props.month,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
    }
  }

  render() {
    return (
      <div>
        {!IS_TABLET
          && (
          <div className="col-lg-2 leftMenu">
            <ul className="graphlist">
              <li className="graphLink"><a href="results/angle#monthlyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
              <li className="graphLink"><a href="results/angle#monthlyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
            </ul>
          </div>
          )
        }
        <div className=" col-lg-10 offset-lg-2 results resultsContainer">
          <div className="col-lg-8 offset-lg-1">
            <div>
              {this.state.month
              && (
              <div>
                <MonthlyAngleDistribution month={this.state.month} />
                <MonthlySuccessTilt month={this.state.month} />
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

export default connect(mapStateToProps)(MonthlyAngleResults);
