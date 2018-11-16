import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store/index.js';
import Root from './Root.jsx';
import '../public/styles/css/index.css';


ReactDOM.render(
  <Root store={ store } />, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

