var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var toastr = require('toastr');
var Server = require('./lib/server.js');
var NavBar = require('./navbar.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var GMaps = require('./maps/initializer.js');
var Maps = require('./maps/maps.jsx');
var LoginModal = require('./user/login_modal.jsx');
var PropTypes = React.PropTypes;

var App = React.createClass({
  getInitialState: function() {
    return {
      modal: null,
      isUser: false,
      token: null
    };
  },
  componentDidMount: function() {
    this.updateStateUser(this.state.token);
  },
  successLogin: function (data, statusText, xhr) {
  toastr.success("Bienvenido!");
  this.unmountModal();
  this.setState({ token: data.auth_token });
  this.updateStateUser(data.auth_token);
  },
  updateStateUser: function (token) {
    if (token) {
      this.setState({isUser: true });
    }else{
      this.setState({isUser: false });
    }
  },
  failLogin: function (data, xhr, statusText) {
    toastr.error(data.responseJSON.errors[0].message);
    toastr.error(data.responseJSON.errors[0].code);
  },
  login: function (user, password) {
    var params = { "session": { "email": user, "password": password } };
    Server.post(this.props.urls.login, params, this.successLogin)
               .fail(this.failLogin);
  },
  loginModal: function () {
    this.setState({
      modal: React.createElement(LoginModal, { login: this.login,
                                              unmount: this.unmountModal })
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
                  <Maps/>
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
