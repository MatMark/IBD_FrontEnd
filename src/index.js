import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import Logged from './views/Logged/Logged';
import Unlogged from './views/Unlogged/Unlogged';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Unlogged />, document.getElementById('root'));

const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, logged: false };
      case 'LOGOUT':
        return { ...state, logged: true };
      default:
        return state;
      }
  };

  const store = createStore(reducer, { logged: false });
  
  if(localStorage.getItem('token')) {
    store.dispatch({ type: 'LOGIN' });
  } else {
    store.dispatch({ type: 'LOGOUT' });
  }
  
  if(localStorage.getItem('token')) {
    ReactDOM.render(
      <Provider store={store}>
        <Logged />
      </Provider> 
      , document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
          <Unlogged/>
      </Provider> 
      , document.getElementById('root')
    );
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
