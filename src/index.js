import T from 'i18n-react';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import Application from './redux/reducers';
import Layout from './layout';
import store from './redux/store';

T.setTexts(require('./res/texts.yaml'));

render(
  <Provider store={store} >
    <Layout />
  </Provider>,
  document.getElementById('root')
);

export default { T };
