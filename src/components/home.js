import React, { Component } from 'react';
import { T } from '../index'
import { connect } from 'react-redux'; 

class Home extends Component {
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
          <h1>{T.translate("home."+ this.props.language)}</h1>
          <h2>Welcome to MoVit, an AgeWell project</h2>
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
export default connect(mapStateToProps)(Home)
