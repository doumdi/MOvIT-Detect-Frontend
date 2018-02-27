import React, { Component } from 'react';
import ReactDom from 'react-dom';
import T from 'i18n-react';


T.setTexts( require('../res/texts.yaml'));
export default class Preference extends Component {
  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center'
      }
    };
    
    return (
      <div style={style}>
        <div className="jumbotron" style={style.content}>
          <h1>{T.translate("preferences.fr" , { context: "context", val: 1})}</h1>
          <h2>Change your preferences for the MovIT-Plus application</h2>
        </div>
      </div>
    );
  }
}
