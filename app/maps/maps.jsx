var React = require('react');
var GMaps = require('./initializer.js');
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
    this.setState({map: GMaps.init(mount)});
    setInterval(this.updateData, (this.props.interval * 1000))
    this.getInitialData();
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
  createMarker: function (location, type, name) {
    var image = {rg: 'images/rg.png', casilla: 'images/casilla.png'}
    var marker = new google.maps.Marker({
      position: this.createLatLng(location[0], location[1]),
      map: this.state.map,
      icon: image[type],
      title: name,
      zIndex: 1
    });
    return marker;
  },
  render: function() {
    return (<div id='map-canvas' ref='map' className='mapa'></div>);
  }

});

module.exports = Maps;
