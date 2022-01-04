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

