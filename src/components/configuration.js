import React, { Component } from 'react';
import { connect } from 'react-redux';
import { T } from '../index';
// import { InputText } from 'primereact/components/inputtext/InputText';

class Configuration extends Component {
  render() {
    const style = {
      content: {
        textAlign: 'center',
        paddingBottom: '5vh'
      },
      icon: {
        paddingTop: '6px',
        fontSize: 'large'
      }
    };

    return (
      <div>
        <div className="col-md-12">
          <div className="form-horizontal">
            <legend className="text-center header"><h2>{T.translate(`configurations.${this.props.language}`)}</h2></legend>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-user" /></span>
              <div className="col-md-6">
                <input type="text" placeholder={T.translate(`configurations.name.${this.props.language}`)} className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-id-card" /></span>
              <div className="col-md-6">
                <input type="text" placeholder={T.translate(`configurations.telask.${this.props.language}`)} className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-wheelchair" /></span>
              <div className="col-md-6">
                <input type="text" placeholder={T.translate(`configurations.maxTilt.${this.props.language}`)} className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-balance-scale" /></span>
              <div className="col-md-6">
                <input type="text" placeholder={T.translate(`configurations.weight.${this.props.language}`)} className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-sm-9 text-right">
            <button type="submit" className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
            &nbsp;
            <button type="submit" className="btn btn-lg">{T.translate(`save.${this.props.language}`)}</button>
          </div>
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
export default connect(mapStateToProps)(Configuration);
