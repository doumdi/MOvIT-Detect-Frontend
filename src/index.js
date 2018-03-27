import { MDText } from 'i18n-react';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import Application from './redux/reducers';
import Layout from './layout';
import store from './redux/store';

const texts = require('./res/texts.yaml');

const T = new MDText(texts, { MDFlavor: 1 });

export { T };
render(
  <Provider store={store} >
    <Layout />
  </Provider>,
  document.getElementById('root'),
);
