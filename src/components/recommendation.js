import React, { Component } from 'react';

export default class Recommendation extends Component {
    render() {
        let style = {
            height: '80vh',
            content: {
                textAlign: 'center'
            }
        }

        return (
            <div style={style}>
                <div class="jumbotron" style={style.content}>
                    <h1>Recommendations</h1>
                    <h2>Consult your doctor's recommendations</h2>
                </div>
            </div>
        );
    }
}