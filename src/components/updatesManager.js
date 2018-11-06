/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { Card } from 'primereact/components/card/Card';

import Countdown from './countdown';
import { URL } from '../redux/applicationReducer';
import { DebugActions } from '../redux/debugReducer';
import { T } from '../utilities/translator';
import '../styles/updatesManager.css'

const POLLING_INTERVAL = 10000;
const COUNTDOWN_TIME = 10;

class UpdatesManager extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isAvailable: true,
      date: null,
      showCountdown: false,
    }
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.updateData();
  }

  componentDidMount() {
    this.poll(); 
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  poll() {
    this.timer = setInterval(async () => {
      this.updateData();
    }, POLLING_INTERVAL);
  }

  mapData(response) {
    const date = new Date(response.date);
    date.setUTCHours(0, date.getTimezoneOffset(), 0, 0);

    this.setState({
      'isAvailable': response.isAvailable,
      'date': date.toISOString().split('T')[0],
    });
  }
  
  async updateData() {
    const status = await this.getUpdateStatus();
    this.mapData(status);
  }

  async getUpdateStatus() {
    try {
      const response = await axios.get(`${URL}updates`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async triggerUpdate() {
    try {
      await axios.post(`${URL}updates`, this.props.header);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`debug.update.${this.props.language}`)}
      </div>
    );
    return (
      <div className="container">
        <div className="card">
          <Card header={header}>
            <div>
              <button
                id="updateButton"
                className={`btn ui-button-secondary ${this.state.isAvailable ? 'btn-danger' : 'btn-default'}`}
                disabled={!this.state.isAvailable}
                onClick={() => this.setState({showCountdown: true})}>
                  <i className="fa fa-2x fa-refresh" />
              </button>
              <div>
                {T.translate(`debug.update.last.${this.props.language}`)}:&nbsp;
                {this.state.date}
              </div>
            </div>
          </Card>
        </div>
        {this.state.showCountdown &&
          <Countdown
            time={COUNTDOWN_TIME}
            title={T.translate(`debug.update.countdownTitle.${this.props.language}`)}
            onComplete={this.triggerUpdate}
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(UpdatesManager);
