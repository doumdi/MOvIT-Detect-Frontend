import React, { Component } from 'react';
import { Slider } from 'primereact/components/slider/Slider';
import { connect } from 'react-redux';
import { T } from '../index';

class Goal extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      frequence: 20,
      bascule: 30,
      angle: 60,
      tiltFrequency: 0,
      tiltLength: 0,
      tiltAngle: 0
    };
  }

  render() {
    const style = {
      bar: {
        paddingLeft: '5%',
        paddingRight: '5%'
      },
      bold: {
        fontWeight: 'bold'
      },
      buttons: {
        marginTop: '2em'
      }
    };
    return (
      <div>
        <legend className="text-center header"><h2>{T.translate(`goals.${this.props.language}`)}</h2></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div className="col-sm-12">
            <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltFrequency.${this.props.language}`)}</span>
            <Slider className="col-sm-6" min={0} max={180} onChange={(e) => this.setState({ tiltFrequency: e.value })} step={5} />
            <span className="col-sm-2" style={style.bold}>{this.state.tiltFrequency} {T.translate(`time.min.${this.props.language}`)}</span>
          </div>
          <div className="col-sm-12">
            <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltLength.${this.props.language}`)}</span>
            <Slider className="col-sm-6" min={0} max={30} onChange={(e) => this.setState({ tiltLength: e.value })} />
            <span className="col-sm-2" style={style.bold}>{this.state.tiltLength} {T.translate(`time.min.${this.props.language}`)} </span>
          </div>
          <div className="col-sm-12">
            <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltAngle.${this.props.language}`)}</span>
            <Slider className="col-sm-6" min={0} max={90} onChange={(e) => this.setState({ tiltAngle: e.value })} />
            <span className="col-sm-2" style={style.bold}>{this.state.tiltAngle} &deg; </span>
          </div>
        </div>
        <div className="col-sm-9 text-right" style={style.buttons}>
          <button type="submit" className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
          &nbsp;
          <button type="submit" className="btn btn-lg">{T.translate(`save.${this.props.language}`)}</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language
  };
}
export default connect(mapStateToProps)(Goal);
