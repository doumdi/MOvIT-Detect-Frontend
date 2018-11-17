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
import { IS_DEMO } from './redux/applicationReducer';
import PressureResults from './views/pressureResults';
import ProgressResults from './views/progressResults';
import Recommendation from './views/recommendation';
import ResultsCategories from './views/resultsCategories';
import Settings from './views/settings';
import Wifi from './views/wifi';
import forgotPassword from './views/forgotPassword';

export default class Layout extends Component {
  render() {
    const style = {
      zIndex: '200',
      demo: {
        paddingTop: '80px',
      },
      normal: {
        paddingTop: '65px',
      },
    };
    return (
      <Router>
        <div>
          <Header />
          <div style={IS_DEMO ? style.demo : style.normal}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route exact path="/results" component={ResultsCategories} />
              <Route path="/results/angle" component={AngleResults} />
              <Route path="/results/pressure" component={PressureResults} />
              <Route path="/results/progress" component={ProgressResults} />
              <Route path="/recommendations" component={Recommendation} />
              <Route path="/goals" component={Goal} />
              <Route path="/configurations" component={Configuration} />
              <Route path="/wifi" component={Wifi} />
              <Route path="/forgotpassword" component={forgotPassword} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
