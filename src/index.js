import React from 'react';
import { render } from 'react-dom';
import Application from './redux/reducers';
import Layout from './layout';
import { Provider } from 'react-redux';
import store from './redux/store';
import T from 'i18n-react';

T.setTexts(require('./res/texts.yaml'));

export { T };

render(
  <Provider store={store} >
    <Layout />
  </Provider>,
  document.getElementById('root')
);
