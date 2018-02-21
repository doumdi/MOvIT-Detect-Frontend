import React, { Component } from 'react';

export default class Graphic extends Component {
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
                    <h1>Graphics</h1>
                    <h2>Consult your chair activities</h2>
                </div>
            </div>
        );
    }
}