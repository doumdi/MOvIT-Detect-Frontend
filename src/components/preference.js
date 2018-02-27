import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { T } from '../index'
import { connect } from 'react-redux'; 

class Preference extends Component {

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
          <h1>{T.translate("preferences."+ this.props.language)}</h1>
          <h2>Change your preferences for the MovIT-Plus application</h2>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.applicationReducer.language
  }
}
export default connect(mapStateToProps)(Preference)
