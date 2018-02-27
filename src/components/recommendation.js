import React, { Component } from 'react';
import { T } from '../index'
import { connect } from 'react-redux'; 

class Recommendation extends Component {
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
          <h1>{T.translate("recommendations."+ this.props.language)}</h1>
          <h2>{"Consult your doctor's recommendations"}</h2>
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
export default connect(mapStateToProps)(Recommendation)
