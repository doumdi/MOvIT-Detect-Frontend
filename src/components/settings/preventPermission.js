/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PreventPermission extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    permission: PropTypes.bool,
    permissionTitle: PropTypes.string.isRequired,
    onPermissionChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-10 d-flex">
          <Checkbox
            id="agreement"
            checked={this.props.permission}
            onChange={(e) => {
              this.props.onPermissionChange(e.checked);
              this.props.onSave();
            }}
          />
          <label htmlFor="agreement">{this.props.permissionTitle}</label>
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

export default connect(mapStateToProps)(PreventPermission);
