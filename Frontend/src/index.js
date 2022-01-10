import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import { Provider } from 'react-redux'
import createStore from './redux/store'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);