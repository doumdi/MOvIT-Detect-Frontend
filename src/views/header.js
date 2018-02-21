import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component {
  render() {
    const style = {
      navbar: { background: '#cc2033', margin: '0px' },
      containerfluid: { width: '90%' },
      title: {
        color: 'white',
        lineHeight: '52px',
        height: '52px',
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        fontSize: '24px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
      },
      link: {
        color: 'white',
        lineHeight: '52px',
        height: '52px',
        paddingTop: 0,
        marginTop: 0,
        marginBottom: 0,
        fontSize: '16px',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
      }
    };
    return (
      <div>
        <nav className="navbar-inverse" style={style.navbar}>
          <div className="container-fluid" style={style.containerfluid}>
            <div className="navbar-header">
              <Link to="" style={style.title}>MovIT-Plus</Link>
            </div>
            <ul className="nav navbar-nav">
              <li> <Link to="graphic" style={style.link}>Graphic</Link> </li>
              <li> <Link to="preference" style={style.link}>Preference</Link> </li>
              <li> <Link to="recommendations" style={style.link}>Recommendations</Link> </li>
              <li> <Link to="goals" style={style.link}>Goals</Link> </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
