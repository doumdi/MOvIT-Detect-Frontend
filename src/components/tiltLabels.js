/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'primereact/components/card/Card';
import { T } from '../utilities/translator';

class TiltLabels extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    title: PropTypes.string,
    tiltFrequecy: PropTypes.number,
    tiltLength: PropTypes.number,
    tiltAngle: PropTypes.number,
    modifiable: PropTypes.bool,
    onModifie: PropTypes.func,
  };

  render() {
    const chairImagePath = require('../res/images/chair-old.png');
    const style = {
      bold: {
        fontWeight: 'bold',
      },
      card: {
        padding: '5px',
        backgroundColor: 'white',
        boxShadow: '5px 5px 5px gainsboro',
      },
      container: {
        padding: '10px',
      },
      header: {
        marginLeft: '14px',
        marginTop: '14px',
      },
    };
    const header = (
      <div className="ui-card-title" style={style.header}>
        {this.props.title}
        {' '}
&nbsp;
        {this.props.modifiable
          && <i className="fa fa-pencil" onClick={() => this.props.onModifie()} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
    return (
      <div style={style.container}>
        <Card header={header} style={style.card} className="col-12">
          <div className="row">
            <div className=" col-12 col-md-4 ml-md-4">
              <div className="row">
                <span className="ml-3" style={style.bold}>
                  {T.translate(`goals.tiltFrequency.${this.props.language}`)}
                </span>
                <span className="ml-3" style={style.bold}>
                  {this.props.tiltFrequecy}
                  {' '}
                  {T.translate(`time.min.${this.props.language}`)}
                </span>
              </div>
              <div className="row">
                <span className="ml-3" style={style.bold}>
                  {T.translate(`goals.tiltLength.${this.props.language}`)}
                </span>
                <span className="ml-3" style={style.bold}>
                  {this.props.tiltLength}
                  {' '}
                  {T.translate(`time.min.${this.props.language}`)}
                </span>
              </div>
              <div className="row">
                <span className="ml-3" style={style.bold}>
                  {T.translate(`goals.tiltAngle.${this.props.language}`)}
                </span>
                <span className="ml-3" style={style.bold}>
                  {this.props.tiltAngle}
                  {' '}
&deg;
                </span>
              </div>
            </div>
            <div className="col-2 offset-1">
              <img
                src={chairImagePath}
                width="50"
                height="50"
                alt="chair"
                style={{ transform: `rotate(-${this.props.tiltAngle}deg)` }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(TiltLabels);
