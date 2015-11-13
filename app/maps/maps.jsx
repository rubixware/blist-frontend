var React = require('react');
var GMaps = require('./initializer.js');
var Server = require('../lib/server.js');
var PropTypes = React.PropTypes;

var Maps = React.createClass({
  getInitialState: function() {
    return {
      map: null,
      markers: [],
      circles: [],
      interval: null
    };
  },
  getDefaultProps: function() {
    return {
      initial_data: function () {},
      update_data: function () {}
    };
  },
  componentDidMount: function() {
    var mount = React.findDOMNode(this.refs.map);
    window.map = GMaps.init(mount);
    this.setState({map: window.map});
    setTimeout(this.loadMarkers, 5000);
  },
  componentWillUnmount: function() {
    for (var i = 0; i < 9999; i++) {
      clearIntervals(i);
    }
  },
  getInitialData: function(){
    this.props.initial_data(this);
  },
  updateData: function(){
    this.props.update_data(this);
  },
  getCleanMarkers: function(){
    return this.removeMarkers(this.state.markers);
  },
  removeMarkers: function (markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
    return markers;
  },
  removeMarker: function (marker) {
    return marker.setMap(null);
  },
  createLatLng: function(lat, lng){
    return new google.maps.LatLng(lat, lng);
  },
  successMarkers: function (data, statusText, xhr) {
      var markers = [];
      for (companie of data.companies) {
        var location = [companie.latitude, companie.longitude];
        markers.push(this.createMarker(location, companie));
      }
      this.setState({ markers: markers });
  },
  failMarkers: function (data) {
  },
  loadMarkers: function () {
    Server.get(this.props.urls.companies, this.successMarkers)
    .fail(this.failMarkers);
  },
  contentString: function (companie) {
    var tags = companie["tags"].join(" ");
    var content = "<div class='info-poi'>"+
    "<ul><li><image src='"+companie.image_url+"' class='logo-poi'/></li><li><a href='"+
    companie.website+"'>"+companie.name+
    "</a></li></ul><ul><li>"+companie.phone+
    "</li><li><a href='"+companie.twitter+
    "'>Twitter</a><a hfer='"+companie.facebook+
    "'>Facebook</a></li></ul><ul><li>Tags: "+tags+"</li></ul></div>";
    return content;
  },
  createMarker: function (location, companie) {
    var image = ['images/frelancer.png', 'images/startup.png', 'images/pyme.png'];
    var infowindow = new google.maps.InfoWindow({
      content: this.contentString(companie)
    });
    var options = {
      position: this.createLatLng(location[0], location[1]),
      map: window.map,
      icon: image[companie.category_id - 1],
      title: companie.name,
      zIndex: 1
    };
    var marker = new google.maps.Marker(options);
    marker.addListener('click', function() {
      infowindow.open(window.map, marker);
    });
    return marker;
  },
  render: function() {
    return (<div id='map-canvas' ref='map' className='mapa'></div>);
  }

});

module.exports = Maps;
