import React from 'react';
import ReactDOM from 'react-dom';
import GMaps from './gmaps.js';
import Server from '../lib/server.js';

export default class GMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      map: "",
      markers: [],
      circles: [],
      interval: 0
    }
  }

  componentDidMount(){
    let container = this.container;
    let map = new GMaps(container).map;
    this.setState({
      map: map
    });
    setTimeout(() => { this.loadMarkers(); }, 5000);
  }

  componentWillUnmount(){
    for (var i = 0; i < 9999; i++) {
      clearInterval(i);
    }
  }

  cleanMarkers(){
    let markers = this.state.markers;
    for (marker of markers) {
      this.removeMarker(marker);
    }
  }

  removeMarker(marker){
    marker.setMap("");
  }

  createPoint(location){
    return new google.maps.LatLng(location[0],location[1]);
  }

  successMarkers(data, status, xhr){
    let markers = [];
    markers = data.companies.map( (company) => {
      let location = [company.latitude, company.longitude];
      return this.createMarker(location, company);
    });
    this.setState({
      markers: markers
    });
  }

  failMarkers(data, status, xhr){
    console.log("Failed markers");
  }

  loadMarkers(){
    Server.get(this.props.sourceUrl,
       (data, status, xhr) => {this.successMarkers(data, status, xhr);})
    .fail(self.failMarkers);
  }

  contentString(company){
    let tags = company["tags"].join(" ");
    let imageUrl = company.image_url;
    let website = company.website;
    let name = company.name;
    let phone = company.phone;
    let twitter = company.twitter;
    let facebook = company.facebook;
    let imageContent = `<image src='${imageUrl}' class='logo-poi'/>`;
    let content = `
      <div class='info-poi'>
        <ul>
          <li>${imageContent}</li>
          <li><a href='${website}'></a>${name}</li>
        </ul>
        <ul>
          <li>${phone}</li>
          <li><a href='${twitter}'>Twitter</a></li>
          <li><a href='${facebook}'>Facebook</a></li>
        </ul>
        <ul><li>Tags: ${tags}</li></ul>
      </div>
    `;
    return content;
  }

  createMarker(location, company){
    let infoWindow  = new google.maps.InfoWindow({
      content: this.contentString(company)
    });
    let options = {
      position: this.createPoint(location),
      map: this.state.map,
      icon: this.props.icons[company.category_id - 1],
      title: company.name,
      zIndex: 1
    };
    let marker = new google.maps.Marker(options);
    marker.addListener('click', () => {
      infoWindow.open(this.state.map, marker);
    });
    return marker;
  }

  render() {
    return (
      <div id="map-canvas" ref={(ref) => this.container = ref} className="mapa">
      </div>
    );
  }

}

GMap.propTypes = {
  initialData: React.PropTypes.func,
  updateData: React.PropTypes.func,
  icons: React.PropTypes.array,
  sourceUrl: React.PropTypes.string,
};

GMap.defaultProps = {
  initialData: () => {},
  updateData: () => {},
  sourceUrl: "",
  icons: ['images/frelancer.png', 'images/startup.png', 'images/pyme.png']
};
