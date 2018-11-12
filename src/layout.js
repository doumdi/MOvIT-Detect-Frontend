/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AngleResults from './views/angleResults';
import Configuration from './views/configuration';
import Goal from './views/goal';
import Header from './views/header';
import Home from './views/home';
import PressureResults from './views/pressureResults';
import ProgressResults from './views/progressResults';
import Recommendation from './views/recommendation';
import ResultsCategories from './views/resultsCategories';
import Settings from './views/settings';
import Wifi from './views/wifi';
import forgotPassword from './views/forgotPassword';

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route exact path="/results" component={ResultsCategories} />
            <Route path="/angleResults" component={AngleResults} />
            <Route path="/pressureResults" component={PressureResults} />
            <Route path="/progressResults" component={ProgressResults} />
            <Route path="/recommendations" component={Recommendation} />
            <Route path="/goals" component={Goal} />
            <Route path="/configurations" component={Configuration} />
            <Route path="/wifi" component={Wifi} />
            <Route path="/forgotpassword" component={forgotPassword} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </Router>
    );
  }
}
