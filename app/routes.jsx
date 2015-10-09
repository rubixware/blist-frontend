var React = require('react');
var Router = require('react-router');
var App = require('./app.jsx');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={App} />
    <Route name="about" handler={App} />
    <Route name="users" handler={App}>
      <Route name="recent-users" path="recent" handler={App} />
      <Route name="user" path="/user/:userId" handler={App} />
      <NotFoundRoute handler={App}/>
    </Route>
    <NotFoundRoute handler={App}/>
    <Redirect from="company" to="about" />
  </Route>
);

module.exports = routes;
