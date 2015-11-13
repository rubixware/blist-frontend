var React = require('react');
var UserMenu = require('./user_menu.jsx');
var PropTypes = React.PropTypes;
var LoginUser = React.createClass({
  getDefaultProps: function() {
    return {
      isUser: false,
      loginModal: function () { console.log(":v");}
    };
  },
  loginClass: function () {
    if (this.props.isUser) {
      return "dropdown hideDOM";
    }else {
      return "dropdown";
    }
  },
  userMenuClass: function () {
    if (this.props.isUser) {
      return "dropdown";
    }else {
      return "dropdown hideDOM";
    }
  },
  render: function() {
    return (
      <div>
        <ul className="nav navbar-right top-nav">
          <li className={this.loginClass()} >
            <a href="#" onClick={this.props.loginModal} >Crear empresa / Iniciar sesión</a>
          </li>
          <UserMenu userMenuClass={this.userMenuClass()} />
        </ul>
      </div>
    );
  }

});

module.exports = LoginUser;
