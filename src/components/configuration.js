import React, { Component } from 'react';
// import { InputText } from 'primereact/components/inputtext/InputText';

export default class Configuration extends Component {
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
            <legend className="text-center header"><h2>Configurations</h2></legend>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-user" /></span>
              <div className="col-md-6">
                <input type="text" placeholder="Patient Name" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-id-card" /></span>
              <div className="col-md-6">
                <input type="text" placeholder="TelASK ID" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-wheelchair" /></span>
              <div className="col-md-6">
                <input type="text" placeholder="Maximum tilt angle" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-balance-scale" /></span>
              <div className="col-md-6">
                <input type="text" placeholder="Patient weight" className="form-control" />
              </div>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg">Save</button>
          </div>
        </div>
      </div>
    );
  }
}
