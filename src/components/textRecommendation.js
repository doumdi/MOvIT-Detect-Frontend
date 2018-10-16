/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { T } from '../utilities/translator';


class TextRecommendation extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    recActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeActive: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  };

  affectDefaultValue(checked) {
    this.props.onChangeActive(checked);
    if (checked) {
      this.props.onChangeValue(T.translate(`recommendations.tiltAsNeeded.${this.props.language}`));
    } else {
      this.props.onChangeValue('');
    }
  }

  render() {
    const style = {
      stickLeft: {
        paddingLeft: '0',
      },
      input: {
        paddingLeft: '0',
        marginBottom: '1em',
      },
      spacingTop: {
        paddingTop: '10',
      },
    };

    return (
      <div className="col-sm-12" style={style.spacingTop}>
        <div className="col-sm-4" style={style.stickLeft}>
          <Checkbox
            inputId="activeRecCheck"
            label={this.props.title}
            onChange={e => this.affectDefaultValue(e.checked)}
            checked={this.props.recActive ? this.props.recActive : false}
          />
          <label htmlFor="activeRecCheck">{this.props.title}</label>
        </div>
        {this.props.recActive
          &&
          <div className="col-sm-7" style={style.input}>
            <InputText
              id="textRec" type="text" className="form-control"
              onChange={e => this.props.onChangeValue(e.target.value)}
              value={this.props.value ? this.props.value : ''}
              placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
            />
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

export default connect(mapStateToProps)(TextRecommendation);
