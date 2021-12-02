//map with no modify options, maybe we can use only one map for all pages?

// Create the map
var startmap = L.map('startmap').setView([51.9692307002609,7.595822811126709], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(startmap);




//get mapmarker from database (created in garden overview)
//Example Gardenmarker
//activate hover
var marker = L.marker([51.9692307002609,7.595822811126709]).addTo(startmap)
		.bindPopup('Garten Nr.1').openPopup();



