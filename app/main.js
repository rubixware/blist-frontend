var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var toastr = require('toastr');
var Bootstrap = require('bootstrap');
var Server = require('./lib/server.js');
var NavBar = require('./navbar.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var GMaps = require('./maps/initializer.js');
var Maps = require('./maps/maps.jsx');
var App = require('./app.jsx');

var domain = "http://rubixdev.cloudapp.net:8080";
var urls = {
  login: domain+"/sessions",
  maps: {
    companies: domain+"/companies",
    companie: domain+"/companie"
  }
};
React.render(<App urls={urls} />, document.querySelector("#app"));
