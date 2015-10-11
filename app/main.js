var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var Bootstrap = require('bootstrap');
var App = require('./app.jsx');

React.render(<App/>, document.body);
