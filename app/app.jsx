var React = require('react');
var NavBar = require('./navbar.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var GMaps = require('./maps/initializer.js');
var Maps = require('./maps/maps.jsx');
var PropTypes = React.PropTypes;

var App = React.createClass({

  render: function() {
    return (
      <div id="wrapper">
        <NavBar/>

        <div id="page-wrapper">

            <div className="container-fluid map-content no-padding">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                  <Maps/>
                </div>
              </div>
            </div>

        </div>

    </div>

    );
  }

});

module.exports = App;
