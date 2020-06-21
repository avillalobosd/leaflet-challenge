var apiKey = "pk.eyJ1IjoibGFsb3ZpZGUiLCJhIjoiY2ticGI3a2E3MW5maDJycW4ydHJtZnVjOCJ9.WxmPhLn4Q0e-hqO0COs0rQ";
console.log("OK")
var mapaInicial = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id:  "mapbox/streets-v11",
  accessToken: apiKey
});

var map = L.map("map", {
  center: [40.7, -94.5],
  zoom: 4
});

mapaInicial.addTo(map);
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    console.log(data)
    let features=data.features

    features.map(function(data){
        let markerColor="black"
        let fillColor="blue"
        let place="Place "+data.properties.place+"</br>"+"Magnitude: "+data.properties.mag

        fillColor = 
        data.properties.mag<=0 ? "#F7EBF0" :
        data.properties.mag<=1 ? "#CFADBB" : 
        data.properties.mag<=2 ? "#A36E84" : 
        data.properties.mag<=3 ? "#B03A6B" :
        data.properties.mag<=4 ? "#871946" : "#560426";

        var circle = L.circleMarker([data.geometry.coordinates[1], data.geometry.coordinates[0]], {
            opacity:1,
            weight:1,
            color: markerColor,
            fillColor: fillColor,
            fillOpacity: 1,
            radius: data.properties.mag*5

        }
        
        
        ).bindPopup(place).addTo(map);
    })



});

