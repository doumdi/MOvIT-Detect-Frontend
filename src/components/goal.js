import React, { Component } from 'react';

export default class Goal extends Component {
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
                    <h1>Goals</h1>
                    <h2>See and set your goals</h2>
                </div>
            </div>
        );
    }
}