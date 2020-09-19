var mymap = L.map("mapid").setView([0, 0], 2);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    minZoom: 0,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiaXNoYTMxIiwiYSI6ImNrZXk3Y3IwNTN5enIyem1xcmo5ZG5nODUifQ.CPu_uf2vtgGwCYzn9bnBLQ",
  }
).addTo(mymap);

var source = new EventSource("/topic/twitter_data");

source.addEventListener(
  "message",
  function (e) {
    var obj = JSON.parse(e.data);
    console.log(obj);
    var lat = obj.place.bounding_box.coordinates[0][0][1];
    var long = obj.place.bounding_box.coordinates[0][0][0];
    var username = obj.user.name;
    var tweet = obj.text;

    marker = L.marker([lat, long])
      .addTo(mymap)
      .bindPopup(
        "Username: <strong>" +
          username +
          "</strong><br>Tweet: <strong>" +
          tweet +
          "</strong>"
      );
  },
  false
);
