var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var toastr = require('toastr');
var BSelect = require('./lib/bootstrap-select.js');
var Server = require('./lib/server.js');
var NavBar = require('./navbar.jsx');
var SideNav = require('./sidenav.jsx');
var UserMenu = require('./user/user_menu.jsx');
var LoginUser = require('./user/login_user.jsx');
var GMaps = require('./maps/initializer.js');
var Maps = require('./maps/maps.jsx');
var Startup = require('./maps/startup.jsx');
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
    this.loadMarkers();
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
  successMarkers: function (data, statusText, xhr) {
      this.setState({ companies: data.companies, original: data.companies });
  },
  failMarkers: function (data) {
  },
  loadMarkers: function () {
    Server.get(this.props.urls.maps.companies, this.successMarkers)
    .fail(this.failMarkers);
  },
  unmountModal: function () {
    this.setState({ modal: null });
  },
  filter: function (companie) {
    return categories.indexOf(companie.category_id);
  },
  filterPoi: function (categories) {
    var companies = this.state.original.filter(function (companie) {
      return ((categories || []).indexOf(companie.category_id+"") >= 0);
    });
    this.setState({ companies: (companies || []) });
  },
  render: function() {
    return (
      <div id="wrapper">
        <NavBar loginModal={this.loginModal} isUser={this.state.isUser}
                companies={this.state.companies} filterPoi={this.filterPoi}/>

        <div id="page-wrapper">
            <div className="container-fluid map-content no-padding">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                  <Maps urls={this.props.urls.maps} companies={this.state.companies}/>
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
