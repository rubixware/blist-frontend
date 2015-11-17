export default class GMaps {

  constructor(container) {
    this.mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(25.675365, -100.3133532)
    };
    this.map = new google.maps.Map(container,this.mapOptions);
    this.addClickHandler();
    this.centerUser();
  }

  addClickHandler(){
    google.maps.event.addListener(this.map, 'click', (event) => {
      console.log(event.latLng);
    });
  }

  centerUser(){
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition( (position) => {
         let initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         this.map.setCenter(initialLocation);
     });
   }
 }
}
