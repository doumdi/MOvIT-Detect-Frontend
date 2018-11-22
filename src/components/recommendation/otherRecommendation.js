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
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { T } from '../../utilities/translator';

class OtherRecommendation extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    recActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    recTitle: PropTypes.string,
    value: PropTypes.string,
    onChangeActive: PropTypes.func.isRequired,
    onChangeRecTitle: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    id: PropTypes.string,
    tooltip: PropTypes.string,
  };

  render() {
    return (
      <div className="pt-2 pl-3 row">
        <div className="col-11 pl-0 mt-1">
          <Checkbox
            inputId="activeRecCheck"
            label={this.props.title}
            onChange={e => this.props.onChangeActive(e.checked)}
            checked={this.props.recActive || false}
          />
          <label htmlFor="activeRecCheck" className="mt-1">{this.props.title}</label>
          {this.props.tooltip
            && (
              <i id={`otherRecInfo${this.props.id}`} className="fa fa-info-circle pl-2" />
            )}
          {this.props.recActive
            && (
            <div className="row">
              <div className="col-12 col-md-6 ml-4 mb-1">
                <InputText
                  id="otherRec"
                  type="text"
                  className="form-control"
                  onChange={e => this.props.onChangeRecTitle(e.target.value)}
                  placeholder={T.translate(`recommendations.otherTitle.${this.props.language}`)}
                  value={this.props.recTitle || ''}
                />
              </div>
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
        <Tooltip
          for={`#otherRecInfo${this.props.id}`}
          title={this.props.tooltip}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(OtherRecommendation);
