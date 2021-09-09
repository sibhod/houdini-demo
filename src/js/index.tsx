import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'containers/App';

import 'styles/index.scss';

const rootEl = document.getElementById('root');

render(
  <Router>
    <App />
  </Router>,
  rootEl,
);
