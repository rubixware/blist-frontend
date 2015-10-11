var GMaps = {
  init: function(dom) {
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(25.675365, -100.3133532)
    };

    var map = new google.maps.Map(dom,
    mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
      console.log(event.latLng);
    });

    return map;
  },
  loadScriptMap: function () {
    window.initialize = this.init;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    '&signed_in=true&sensor=false&language=es' +
    '&key=AIzaSyCXP_1QoheSEbmjM1VZl_TK3o3Rg-aX65M&callback=initialize';
    document.body.appendChild(script);
  }
};

module.exports = GMaps;
