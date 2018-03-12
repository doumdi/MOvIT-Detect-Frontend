import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';

class Header extends Component {

  render() {
    const style = {
      navbar: { background: '#cc2033', margin: '0px' },
      containerfluid: { width: '90%' },
      title: {
        color: 'white',
        lineHeight: '52px',
        height: '52px',
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        fontSize: '24px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
      },
      link: {
        color: 'white',
        lineHeight: '52px',
        height: '52px',
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: '16px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        cursor: 'pointer'
      }
    };
    return (
      <div>
        <nav className="navbar-inverse" style={style.navbar}>
          <div className="container-fluid" style={style.containerfluid}>
            <div className="navbar-header">
              <Link to="" style={style.title}>MovIT-Plus</Link>
            </div>
            <ul className="nav navbar-nav">
              {this.props.profile
                &&
                <li> <Link to="graphic" style={style.link}>{T.translate(`graphics.${this.props.language}`)}</Link> </li>
              }
              {this.props.profile === 'user'
                &&
                <li> <Link to="parameter" style={style.link}>{T.translate(`parameters.${this.props.language}`)}</Link> </li>
              }
              {this.props.profile === 'clinician'
                &&
                <li> <Link to="recommendations" style={style.link}>{T.translate(`recommendations.${this.props.language}`)}</Link> </li>
              }
              {this.props.profile
                &&
                <li> <Link to="goals" style={style.link}>{T.translate(`goals.${this.props.language}`)}</Link> </li>
              }
              {this.props.profile === 'clinician'
                &&
                <li> <Link to="configurations" style={style.link}>{T.translate(`configurations.${this.props.language}`)}</Link> </li>
              }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li onClick={this.props.changeLanguage}>
                <a style={style.link}>{this.props.language}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    profile: state.applicationReducer.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLanguage: ApplicationActions.changeLanguage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
