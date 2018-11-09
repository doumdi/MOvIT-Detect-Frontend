/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../../utilities/translator';

class ConfirmationPopup extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
  };

  render() {
    const style = {
      dialog: {
        display: 'flex',
        alignItems: 'center',
      },
      body: {
        textAlign: 'justify',
      },
      icon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      },
    };
    return (
      <div>
        {this.props.show && (
          <div>
            <Modal.Dialog style={style.dialog}>
              <Modal.Header>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={style.body}>
                <div className="row">
                  <div className="col">
                    <i className="fa fa-question-circle fa-3x" style={style.icon} />
                  </div>
                  <div className="col-10">
                    {this.props.body}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button id="closeButton" onClick={this.props.onClose}>
                  {T.translate(`confirmation.close.${this.props.language}`)}
                </Button>
                <Button id="confirmButton" bsStyle="success" onClick={this.props.onConfirm}>
                  {T.translate(`confirmation.confirm.${this.props.language}`)}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(ConfirmationPopup);
