import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomCard from '../../../shared/card';
import { URL } from '../../../../redux/applicationReducer';
import { T } from '../../../../utilities/translator';
import { get } from '../../../../utilities/secureHTTP';
import '../../../../styles/results.css';

const tiltCount = 5;
const timeOffset = -5;

class DailyLastTilts extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
  }

  constructor(props) {
    super(props);
    this.state = {
      dayData: [],
      date: props.date,
      data: null,
      loading: true,
    };
    this.getData(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.getData(nextProps.date);
    }
  }

  async getData(date) {
    this.state.loading = true;
    const response = await get(`${URL}lastTilts?Day=${+date},offset=${timeOffset},count=${tiltCount}`);
    this.state.dayData = response.data; this.loadData(response.data);
  }

  getResult(index) {
    // Indexes: 0 success
    // 1 trop court
    // 2 fail
    // 3 snooze
    // 4 wrong angle
    switch (index) {
      case 0: return T.translate(`lastTilts.successful.${this.props.language}`);
      case 1: return T.translate(`lastTilts.tooShort.${this.props.language}`);
      case 2: return T.translate(`lastTilts.unsuccessful.${this.props.language}`);
      case 3: return T.translate(`lastTilts.snooze.${this.props.language}`);
      case 4: return T.translate(`lastTilts.tooSmallAngle.${this.props.language}`);
      default:
        break;
    }
  }

  getTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours() + timeOffset;
    const minutes = date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes();
    return `${hours}:${minutes}`;
  }

  loadData(data) {
    this.setState({ data, loading: false });
  }

  render() {
    const element = (
      <div>
        {this.state.data && this.state.data.map((tilt, index) => (
          <div className="row" key={`lastTilts${tilt.timestamp}`}>
            <div className="col-6">
              {index + 1}. {T.translate(`lastTilts.result.${this.props.language}`)}: {this.getResult(tilt.index)}
            </div>
            <div className="col-6">
              {T.translate(`lastTilts.time.${this.props.language}`)}: {this.getTime(tilt.timestamp)}
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div className="container graphic" id="dailyLastTilt">
        {!this.state.loading && (
          <CustomCard
            header={<h4>{T.translate(`lastTilts.title.${this.props.language}`)}</h4>}
            element={element}
          />
        )}
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

export default connect(mapStateToProps)(DailyLastTilts);
