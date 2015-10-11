var React = require('react');
var PropTypes = React.PropTypes;

var Startup = React.createClass({
  categorie_img: function () {
    var image = ['images/frelancer.png', 'images/startup.png', 'images/pyme.png'];
    return image[this.props.companie.categorie_id - 1];
  },
  render: function() {
    var tags = (this.props.companie.tags || []).join(" ");
    return (
      <div className="row startup">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <image src={this.props.companie.image_url} className="img-responsive fix-logo-startup"/>
            </div>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <h5>{this.props.companie.name}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <image src={this.categorie_img()} className="img-responsive"/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {this.props.companie.city}, {this.props.companie.region}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {tags}
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }

});

module.exports = Startup;
