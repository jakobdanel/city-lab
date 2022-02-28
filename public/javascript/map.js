var map = L.map('mapdiv'); 
map.setView([51.975, 7.61], 13);

//Basemap Layer
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); 

//Feature Group Layers for the Input Features
var locationLayer = L.featureGroup().addTo(map);

//draw Features
var drawControl = new L.Control.Draw({
    draw: {
        //disable all draw functions but Points and Polygons
        polyline: false, 
        polygon: false,
        circle: false,
        circlemarker: false,
        marker: true,
        rectangle: false
    },
    edit: {
        //drawn features will be stored in the locationLayer
        featureGroup: locationLayer,
        remove: true,
        edit: true 
    }
}); 
map.addControl(drawControl); //add the control to the map

map.on('draw:created', function(e) {
    
  
        //add object to map
        currentLayer = e.layer;
        locationLayer.addLayer(e.layer); //add new Object to the locationLayer
        e.layer.bindPopup( //bind a popup to the newly created "location"
            '<h5><b>Add a Garden</b></h5>'
            + '<label for="gname" style="color:black">Gardenname</label><br>'
            + '<input type="text" id="gname" name="gname"><br>'
            + '<button type="button" class="btn btn-secondary" onclick="passLocationToAddForm()">Add</button><br><br>'
        ).openPopup([e.layer._latlng.lat, e.layer._latlng.lng]); //open the popup

});

/**
 * Add static gardens to leaflet map
 */
const gardens = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Botanischer Garten Münster",
          "url": "https://www.uni-muenster.de/BotanischerGarten/",
          "adress": "Schlossgarten 3, 48149 Münster"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.609673738479614,
            51.96342355295976
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "GeoGarden",
          "url": "https://uni-muenster.de",
          "adress": "Heisenbergstraße 2, 48149 Münster"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.595500946044922,
            51.96907867298536
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Kleiner Dahlkamp",
          "url": "http://www.kleinerdahlkamp.de/",
          "email": "Vorstand@kleinerdahlkamp.de"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.654917240142821,
            51.95042828604289
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Südpark"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.627226114273071,
            51.948861062206284
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Wienburgpark"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.626485824584961,
            51.981126887532156
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {"name":"Aasee-Wiesen"},
        "geometry": {
          "type": "Point",
          "coordinates": [
            7.604845762252807,
            51.95179046986434
          ]
        }
      }
    ]
  };

for(let i = 0; i < gardens.features.length; i++){
    let garden = gardens.features[i];
    let marker = L.marker([garden.geometry.coordinates[1], garden.geometry.coordinates[0]]);
    let html = 
    '<h5><b>' + garden.properties.name + '</b></h5>'
    if(garden.properties.url){
        html += '<p>Website: </p><a href="' + garden.properties.url + '">' + garden.properties.url + '</a><br>';
    }
    if(garden.properties.email){
        html += '<p>Email: </p><a href="mailto:' + garden.properties.email + '">' + garden.properties.email + '</a><br>';
    }
    if(garden.properties.adress){
        html += '<p>Adresse: ' + garden.properties.adress + '</p><br>';
    }
    if(garden.properties.telefon){
        html += '<p>Phone Number: ' + garden.properties.telefon + '</p><br>';
    }
    
    marker.bindPopup(html);
    marker.addTo(map);
}