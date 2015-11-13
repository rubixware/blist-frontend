var React = require('react');
var PropTypes = React.PropTypes;

var SideNav = React.createClass({

  render: function() {
    return (
      <div>
        <ul className="nav navbar-nav side-nav">
          <li>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
            <li className="active">
                <a href="index.html"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
            </li>
            <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw fa-arrows-v"></i> Dropdown <i className="fa fa-fw fa-caret-down"></i></a>
                <ul id="demo" className="collapse">
                    <li>
                        <a href="#">Dropdown Item</a>
                    </li>
                    <li>
                        <a href="#">Dropdown Item</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="blank-page.html"><i className="fa fa-fw fa-file"></i> Blank Page</a>
            </li>
            <li>
                <a href="index-rtl.html"><i className="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
            </li>
        </ul>
      </div>
    );
  }

});

module.exports = SideNav;
