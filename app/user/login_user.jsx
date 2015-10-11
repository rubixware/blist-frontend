var React = require('react');
var UserMenu = require('./user_menu.jsx');
var PropTypes = React.PropTypes;
var LoginUser = React.createClass({

  render: function() {
    return (
      <div>
        <ul className="nav navbar-right top-nav">
          <a href="javascript:;">Crear empresa / Iniciar sesión</a>
        </ul>
      </div>
    );
  }

});

module.exports = LoginUser;
