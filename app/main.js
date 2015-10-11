var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var Bootstrap = require('bootstrap');
var NavBar = require('./navbar.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var GMaps = require('./maps/initializer.js');
var Maps = require('./maps/maps.jsx');
var App = require('./app.jsx');

React.render(<App />, document.querySelector("#app"));
