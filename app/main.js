import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

let domain = "http://rubixdev.cloudapp.net:8080";
let urls = {
  login: `${domain}/sessions`,
  maps: {
    companies: `${domain}/companies`,
    company: `${domain}/company`
  }
};
let container = document.getElementById("app");
ReactDOM.render(<App urls={urls}></App>, container);
