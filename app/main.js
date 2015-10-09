var React = require('react');
var Router = require('react-router');
var App = require('./app.jsx');
var routes = require('./routes.jsx');

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
