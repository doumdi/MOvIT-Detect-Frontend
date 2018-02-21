import React, { Component } from 'react';
import {LineChart, AreaChart, PieChart} from 'react-easy-chart';

export default class Graphic extends Component {
    render() {
        let style = {
            marginBottom: '20vh',
            content: {
                textAlign: 'center'
            },
            chart_lines: {
                strokeWidth: 0
            },
            chart_text: {
                fontFamily: 'serif',
                fontSize: '1.25em',
                fill: '#333'
              }
        };

        let chartData = [
            [
              { x: 'Mon', y: 20 },
              { x: 'Tue', y: 10 },
              { x: 'Wed', y: 33 },
              { x: 'Thu', y: 45 },
              { x: 'Fri', y: 15 }
            ], [
              { x: 'Mon', y: 10 },
              { x: 'Tue', y: 15 },
              { x: 'Wed', y: 13 },
              { x: 'Thu', y: 15 },
              { x: 'Fri', y: 10 }
            ]
          ];
        let pieData = [
            {key: 'Incled', value: 100, color: '#aaac84'},
            {key: 'Rested', value: 200, color: '#dce7c5'},
            {key: 'Other', value: 50, color: '#e3a51a'}
        ]
            

        return (
            <div style={style}>
                <div style={style.content}>
                    <h1>Graphics</h1>
                </div>
                <div className="col-sm-5">
                    <LineChart xType={'text'}
                        axes
                        width={500}
                        height={350}
                        interpolate={'cardinal'}
                        data={chartData}/>
                </div>

                <div className="col-sm-5">
                    <AreaChart xType={'text'}
                        axes
                        width={500}
                        height={350}
                        interpolae={'cardinal'}
                        data={chartData}/>
                </div>

                <div className="col-sm-6" style={style}>
                    <PieChart
                        labels
                        styles={{
                        '.chart_lines': {
                            strokeWidth: 0
                        },
                        '.chart_text': {
                            fontFamily: 'serif',
                            fontSize: '1.25em',
                            fill: '#333'
                        }
                        }}
                        data={[
                        {key: 'A', value: 100, color: '#aaac84'},
                        {key: 'B', value: 200, color: '#dce7c5'},
                        {key: 'C', value: 50, color: '#e3a51a'}]}
                        />
                </div>

                <div className="col-sm-6" style={style}>
                    <PieChart
                        labels
                        innerHoleSize={200}
                        styles={{
                        '.chart_lines': {
                            strokeWidth: 0
                        },
                        '.chart_text': {
                            fontFamily: 'serif',
                            fontSize: '1.25em',
                            fill: '#333'
                        }
                        }}
                        data={[
                        {key: 'A', value: 100, color: '#aaac84'},
                        {key: 'B', value: 200, color: '#dce7c5'},
                        {key: 'C', value: 50, color: '#e3a51a'}]}
                        />
                </div>
            </div>
        );
    }
}