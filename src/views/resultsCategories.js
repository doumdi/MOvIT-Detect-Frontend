/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ApplicationActions } from '../redux/applicationReducer';
import CustomCard from '../components/shared/card';
import { T } from '../utilities/translator';

class ResultsCategories extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  loadResults(category) {
    this.props.history.push(`/results/${category}`);
  }

  render() {
    const style = {
      content: {
        textAlign: 'center',
        height: 'fit-content',
      },
      pageTop: {
        marginBottom: '2em',
      },
      profileButton: {
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        border: 0,
        outline: 'none',
        cursor: 'pointer',
      },
    };

    return (
      <div style={style.content} className="content-section mt-4 implementation ui-fluid">
        <h2>{T.translate(`results.${this.props.language}`)}</h2>
        <h3 style={style.pageTop}>{T.translate(`results.categories.${this.props.language}`)}</h3>
        <div>
          <div className="row col-lg-12">
            <div className="col-12 col-lg-6">
              <CustomCard
                element={(
                  <button onClick={() => this.loadResults('angle')} type="button" style={style.profileButton}>
                    <h2>{T.translate(`results.categories.angle.${this.props.language}`)}</h2>
                    <i className="fa fa-wheelchair icons tilted" />
                  </button>
              )}
              />
            </div>
            <div className="col-12 col-lg-6">
              <CustomCard
                element={(
                  <button onClick={() => this.loadResults('pressure')} type="button" style={style.profileButton}>
                    <h2>{T.translate(`results.categories.pressure.${this.props.language}`)}</h2>
                    <i className="fa fa-balance-scale icons" />
                  </button>
              )}
              />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeProfile: ApplicationActions.changeProfile,
    changeToken: ApplicationActions.changeToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsCategories);
