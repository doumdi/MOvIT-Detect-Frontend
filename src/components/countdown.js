import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { T } from '../utilities/translator';

class Countdown extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      timer: props.time,
    };
  }

  componentDidMount() {
    this.countdown();
  }

  countdown() {
    const countdown = window.setInterval(() => {
      this.setState({ ...this.state, timer: this.state.timer - 1 });
      if (this.state.timer === 0) {
        window.clearInterval(countdown);
        this.setState({ show: false });
        this.props.onComplete();
      }
    }, 1000);
  }

  render() {
    const style = {
      timer: {
        fontSize: '30',
        textAlign: 'center',
        width: '100%',
      },
      timerHeader: {
        fontSize: '20',
        textAlign: 'center',
        width: '100%',
      },
    };
    return (
      <Dialog
        visible={this.state.show} width="300px" height="100px" showHeader={false}
        modal onHide={() => this.setState({ show: false })}
      >
        <div style={style.timerHeader}> {T.translate(`calibrating.${this.props.language}`)} </div>
        <div style={style.timer}>{this.state.timer}</div>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(Countdown);
