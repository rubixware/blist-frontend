var React = require('react');
var $ = require('jquery');
var PropTypes = React.PropTypes;

var LoginModal = React.createClass({
  getDefaultProps: function() {
    return {
      login: function (user, pass) {console.log(":v");}
    };
  },
  componentDidMount: function() {
    this.init();
  },
  init: function() {
    var modal = React.findDOMNode(this.refs.modal);
    $(modal).modal('show');
    $(modal).on('hidden.bs.modal', this.props.unmount);
  },
  hide: function () {
    var modal = React.findDOMNode(this.refs.modal);
    $(modal).modal('hide');
  },
  componentWillUnmount: function() {
    this.hide();
  },
  login: function () {
    var user = React.findDOMNode(this.refs.user).value;
    var password = React.findDOMNode(this.refs.password).value;
    this.props.login(user, password);
  },
  render: function() {
    return (
      <div className="modal fade" id="exampleModal" ref='modal' tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="exampleModalLabel">Iniciar sesión</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="user-name" className="control-label">Usuario:</label>
                  <input type="text" ref="user" className="form-control"
                         id="recipient-name" placeholder="admin@example.com" />
                </div>
                <div className="form-group">
                  <label for="password" className="control-label">Contraseña:</label>
                  <input type="password" ref="password" className="form-control"
                         id="password" placeholder="Contraseña"/>
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <a href="#">Recuperar contraseña</a>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-success" onClick={this.login}>Aceptar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = LoginModal;
