/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../utilities/translator';

class ResultsCategories extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      category: null,
    };
  }

  loadResults(category) {
    this.props.history.push(`/${category}Results`);
  }

  render() {
    const style = {
      content: {
        textAlign: 'center',
        height: 'fit-content',
      },
      icons: {
        fontSize: '15em',
        cursor: 'pointer',
      },
      angle: {
        fontSize: '15em',
        cursor: 'pointer',
        transform: 'rotate(-25deg)',
      },
      pageTop: {
        marginBottom: '2em',
      },
      profileButton: {
        backgroundColor: 'transparent',
        border: 0,
        outline: 'none',
      },
    };

    return (
      <div style={style.content} className="content-section mt-3 mt-md-4 implementation ui-fluid">
        <h2>{T.translate(`results.${this.props.language}`)}</h2>
        <h3 style={style.pageTop}>{T.translate(`results.categories.${this.props.language}`)}</h3>
        <div>
          <div className="row col-md-12">
            <div className="col-12 col-md-4">
              <button onClick={() => this.loadResults('angle')} style={style.profileButton}>
                <h2>{T.translate(`results.categories.angle.${this.props.language}`)}</h2>
                <i className="fa fa-wheelchair" style={style.angle} />
              </button>
            </div>
            <div className="col-12 col-md-4">
              <button onClick={() => this.loadResults('pressure')} style={style.profileButton} >
                <h2>{T.translate(`results.categories.pressure.${this.props.language}`)}</h2>
                <i className="fa fa-balance-scale" style={style.icons} />
              </button>
            </div>
            <div className="col-12 col-md-4">
              <button onClick={() => this.loadResults('progress')} style={style.profileButton} >
                <h2>{T.translate(`results.categories.progress.${this.props.language}`)}</h2>
                <i className="fa fa-tasks" style={style.icons} />
              </button>
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
