var React = require('react');
var BSelect = require('./lib/bootstrap-select.js');
var Startup = require('./maps/startup.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var PropTypes = React.PropTypes;

var NavBar = React.createClass({
  getDefaultProps: function() {
    return {
      isUser: false,
      loginModal: function () {console.log(":v!");},
      filterPoi: function () {console.log("NO jalo :v");}
    };
  },
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                <image src="images/logo.png" className="img-responsive brand-logo"/>
              </a>
          </div>
          <SideNav companies={this.props.companies} filterPoi={this.props.filterPoi}/>
          <div className="collapse navbar-collapse navbar-ex1-collapse">
            <LoginUser isUser={this.props.isUser} loginModal={this.props.loginModal}/>
          </div>
      </nav>

    );
  }

});

module.exports = NavBar;
