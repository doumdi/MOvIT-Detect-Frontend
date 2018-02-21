import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

import Header from './views/header'
import Footer from './views/footer'
import Preference from './components/preference';
import Graphic from './components/graphic';
import Home from './components/home';
import Goal from './components/goal';
import Recommendation from './components/recommendation';

export default class Layout extends Component {
  render() {
    
    return (
      <Router>
        <div>
          <Header/>
          
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/graphic" component={Graphic}/>
            <Route path="/preference" component={Preference}/>
            <Route path="/recommendations" component={Recommendation}/>
            <Route path="/goals" component={Goal}/>
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
