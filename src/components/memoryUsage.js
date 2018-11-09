/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import axios from 'axios';
import { connect } from 'react-redux';

class MemoryUsage extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      'total': 0,
      'used': 0,
    };
    this.load();
  }

  async load() {
    const memory = await this.getMemoryUsage();

    this.setState({
      'total': memory.total,
      'used': memory.used
    });
  }

  async getMemoryUsage() {
    try {
      const response = await axios.get(`${URL}memory`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(MemoryUsage);
