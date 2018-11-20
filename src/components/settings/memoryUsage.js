/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../../redux/applicationReducer';
import { get } from '../../utilities/secureHTTP';

class MemoryUsage extends Component {
  static propTypes = {
    header: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      used: 0,
    };
    this.load();
  }

  async getMemoryUsage() {
    const response = await get(`${URL}memory`);
    return response.data;
  }

  async load() {
    const memory = await this.getMemoryUsage();

    this.setState({
      total: memory.total,
      used: memory.used,
    });
  }

  render() {
    const style = {
      maxWidth: '400px',
    };
    return (
      <div>
        <ProgressBar style={style} value={this.state.used / this.state.total * 100} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(MemoryUsage);
