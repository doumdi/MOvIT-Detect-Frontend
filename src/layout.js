import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './views/header';
// import Footer from './views/footer';
import Graphic from './components/graphic';
import Home from './components/home';
import Goal from './components/goal';
import Recommendation from './components/recommendation';
import Configuration from './components/configuration';
import Parameters from './components/parameter';

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact="true" path="/" component={Home} />
            <Route path="/graphic" component={Graphic} />
            <Route path="/parameter" component={Parameters} />
            <Route path="/recommendations" component={Recommendation} />
            <Route path="/goals" component={Goal} />
            <Route path="/configurations" component={Configuration} />
          </Switch>

          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
