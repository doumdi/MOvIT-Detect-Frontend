
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { T } from '../utilities/translator';

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
  };

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
            onChange={this.props.onChangeActive}
            checked={this.props.recActive}
          />
          <label htmlFor="activeRecCheck">{this.props.title}</label>
        </div>
        {this.props.recActive
        &&
        <div>
          <div className="col-sm-7" style={style.input}>
            <InputText
              id="otherRec" type="text" className="form-control"
              onChange={e => this.props.onChangeRecTitle(e.target.value)}
              placeholder={T.translate(`recommendations.otherTitle.${this.props.language}`)}
              value={this.props.recTitle}
            />
          </div>
          <div className="col-sm-7 col-sm-offset-4" style={style.input}>
            <InputText
              id="textRec" type="text" className="form-control"
              onChange={e => this.props.onChangeValue(e.target.value)}
              value={this.props.value}
              placeholder={T.translate(`recommendations.tiltAsNeeded.${this.props.language}`)}
            />
          </div>
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

export default connect(mapStateToProps)(OtherRecommendation);
