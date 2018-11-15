/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import './styles/overwrite.css';
import './styles/style.css';

import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import Layout from './layout';
import store from './redux/store';

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root'),
);
