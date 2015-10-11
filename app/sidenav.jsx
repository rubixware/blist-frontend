var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var BSelect = require('./lib/bootstrap-select.js');
var Startup = require('./maps/startup.jsx');
var PropTypes = React.PropTypes;

var SideNav = React.createClass({
  getInitialState: function() {
    return {
      startups: []
    };
  },
  getDefaultProps: function() {
    return {
      companies: [],
      filterPoi: function () {console.log("NO jalo en lo mas bajo namas");}
    };
  },
  componentDidMount: function() {
    var dom = React.findDOMNode(this.refs.categories);
    $(dom).selectpicker({title: "Categorias"});
    this.startups(this.props.companies);
  },
  startups: function (companies) {
    var startups = companies.map(function (companie, index) {
      return <Startup companie={companie} key={index}/>;
    }, this);
    this.setState({ startups: startups });
  },
  filter: function (e) {
    var select = React.findDOMNode(this.refs.categories);
    console.log($(select).val());
    this.props.filterPoi($(select).val());
  },
  componentWillReceiveProps: function(nextProps) {
    this.startups(nextProps.companies)
  },
  render: function() {
    return (
      <div>
        <ul className="nav navbar-nav side-nav">
          <li>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="hotfix">&nbsp;</div>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="hotfix">&nbsp;</div>
            <div className="hotfix">&nbsp;</div>
          </li>
          <li>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="hotfix">&nbsp;</div>
              <select ref="categories" multiple={true} data-width="21.5rem" onChange={this.filter}>
                <option value="1">Frelancer</option>
                <option value="2">Startup</option>
                <option value="3">PYME</option>
              </select>
            </div>
          </li>
          <li className="startup-list">
            <div className="hotfix">&nbsp;</div>
            <div className="startup-container">
              {this.state.startups}
            </div>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = SideNav;
