/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'primereact/components/button/Button';
import { T } from '../../utilities/translator';

class SumbitButtons extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    displayCancel: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayCancel: this.props.displayCancel === undefined ? true : this.props.displayCancel,
    };
  }

  render() {
    return (
      <div className="text-right col-10 offset-1 offset-md-0 py-3">
        {this.state.displayCancel
        && (
        <Button
          onClick={() => this.props.onCancel()}
          id="cancelButton"
          type="button"
          className="p-button-secondary mb-2 mb-sm-0"
          label={T.translate(`cancel.${this.props.language}`)}
        />
        )}

        &nbsp;
        <Button
          onClick={() => this.props.onSave()}
          type="button"
          id="saveButton"
          className="p-button-secondary mb-2 mb-sm-0"
          label={T.translate(`save.${this.props.language}`)}
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

export default connect(mapStateToProps)(SumbitButtons);
