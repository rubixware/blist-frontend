var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
window.jQuery = $;
var toastr = require('toastr');
var Server = require('./lib/server.js');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var LoginModal = require('./user/login_modal.jsx');
var PropTypes = React.PropTypes;
import NavBar from './navbar.jsx';
import GMap from './maps/gmap.jsx';

var App = React.createClass({
  getInitialState: function() {
    return {
      modal: "",
      isUser: false,
      token: ""
    };
  },
  componentDidMount: function() {
    this.updateStateUser(this.state.token);
  },
  successLogin: function (data, statusText, xhr) {
    toastr.success("Bienvenido!");
    this.unmountModal();
    this.setState({
      token: data.auth_token
    });
    this.updateStateUser(data.auth_token);
  },
  updateStateUser: function (token) {
    var isUser = (token) ? true : false;
    this.setState({
      isUser: isUser
    });
  },
  failLogin: function (data, xhr, statusText) {
    toastr.error(data.responseJSON.errors[0].message);
    toastr.error(data.responseJSON.errors[0].code);
  },
  login: function (user, password) {
    var params = { "session": { "email": user, "password": password } };
    var urlLogin = this.props.urls.login;
    Server.post(
        urlLogin,
        params,
        this.successLogin)
      .fail(this.failLogin);
  },
  loginModal: function () {
    var modal = { login: this.login,
      unmount: this.unmountModal };
    this.setState({
      modal: modal
    });
  },
  unmountModal: function () {
    this.setState({ modal: null });
  },
  render: function() {
    return (
      <div id="wrapper">
        <NavBar loginModal={this.loginModal} isUser={this.state.isUser}/>

        <div id="page-wrapper">
            <div className="container-fluid map-content no-padding">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                  <GMap sourceUrl={this.props.urls.maps.companies}>
                  </GMap>
                </div>
              </div>
            </div>
        </div>
        {this.state.modal}
    </div>

    );
  }

});

module.exports = App;
