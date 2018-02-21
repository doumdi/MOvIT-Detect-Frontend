import React, { Component } from 'react';

export default class Home extends Component {
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
                    <h1>Home</h1>
                    <h2>Welcome to MoVit, an AgeWell project</h2>
                </div>
            </div>
        );
    }
}