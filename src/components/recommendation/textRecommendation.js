/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { T } from '../../utilities/translator';


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
    return (
      <div className="pt-2 pl-3 row">
        <div className="col-11 pl-0 mt-1">
          <Checkbox
            inputId="activeRecCheck"
            label={this.props.title}
            onChange={e => this.affectDefaultValue(e.checked)}
            checked={this.props.recActive || false}
          />
          <label htmlFor="activeRecCheck" className="mt-1">{this.props.title}</label>

          {this.props.recActive
            && (
            <div className="row">
              <div className="col-12 col-md-6 ml-4 mb-1">
                <InputText
                  id="textRec"
                  type="text"
                  className="form-control"
                  onChange={e => this.props.onChangeValue(e.target.value)}
                  value={this.props.value || ''}
                  placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
                />
              </div>
            </div>
            )
          }
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

export default connect(mapStateToProps)(TextRecommendation);
