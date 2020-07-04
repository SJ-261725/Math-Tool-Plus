import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './GUI/Nav';
// import "./js/olddraw"
import "./js/draw"
import PartSettings from './GUI/PartSettings'
import StateField from './GUI/StateField'
import "./MTPP.css"
import "./css/Main.css"
import "./css/GUI.css"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Nav />,
  document.querySelector('nav')
);
ReactDOM.render(
    <StateField />,
  document.querySelector('.right-side-tool')
);
ReactDOM.render(
  <PartSettings/>,
  document.querySelector('#alert')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
