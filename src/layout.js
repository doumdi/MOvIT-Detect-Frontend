/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './views/header';
import Footer from './views/footer';
import Graphic from './views/graphic';
import Home from './views/home';
import Goal from './views/goal';
import Recommendation from './views/recommendation';
import Configuration from './views/configuration';
import Parameters from './views/parameter';
import Wifi from './views/wifi';
import forgotPassword from './views/forgotPassword';

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact="true" path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/graphic" component={Graphic} />
            <Route path="/parameter" component={Parameters} />
            <Route path="/recommendations" component={Recommendation} />
            <Route path="/goals" component={Goal} />
            <Route path="/configurations" component={Configuration} />
            <Route path="/wifi" component={Wifi} />
            <Route path="/forgotpassword" component={forgotPassword} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
