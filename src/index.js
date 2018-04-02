import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import Application from './redux/reducers';
import Layout from './layout';
import store from './redux/store';

render(
  <Provider store={store} >
    <Layout />
  </Provider>,
  document.getElementById('root'),
);
