/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../../../../utilities/translator';
import CustomCard from '../../../shared/card';
import { getElement } from '../../../../utilities/loader';

class GoalProgress extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    isLoaded: PropTypes.bool.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  }

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    const header = (
      <div>
        <h2 style={style.center}>{this.props.title}</h2>
        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
      </div>
    );
    const progressBar = (
      <div>
        <ProgressBar value={this.props.value} />
        <p style={style.center}>
          {T.translate(`dailyResults.recommended.description.${this.props.language}`,
            { percent: this.props.value })}
        </p>
      </div>
    );

    return (
      <div>
        {this.props.condition
          && (
            <div>
              <CustomCard
                header={header}
                element={getElement(this.props.isLoaded, this.props.hasErrors, progressBar)}
              />
            </div>
          )
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

export default connect(mapStateToProps)(GoalProgress);
