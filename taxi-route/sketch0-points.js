// tutorial = https://mappa.js.org/docs/taxi-routes.html
// source = https://github.com/andresmh/nyctaxitrips
// data = https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/taxiroutes/data/taxiday1.geojson
let canvas
let mymap
const mappa = new Mappa('Leaflet');
const options = {
	lat: 40.73447,
	lng: -74.00232,
	zoom: 13,
  // styleList: http://bl.ocks.org/Xatpy/raw/854297419bd7eb3421d0/
	style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

var data;
let tripsCoordinates;
let allCoordinates = [];

function preload(){
  //data = loadJSON('./data/taxiday1.geojson');
    data = loadJSON('https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/taxiroutes/data/taxiday1.geojson');

}

function setup() {
  canvas = createCanvas(640,640);
  mymap = mappa.tileMap(options);
  mymap.overlay(canvas);

  tripsCoordinates = mymap.geoJSON(data, "LineString");
  tripsCoordinates.forEach(function(trip){
    trip.forEach(function(coordinate){
      allCoordinates.push(coordinate)
    })

  });

  mymap.onChange(drawPoint)

}

function draw() {

}

function drawPoint() {
  clear()
  noStroke();
  fill(255);
  for (let i = 0; i < allCoordinates.length; i++) {
    let pos = mymap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0]);
    ellipse(pos.x, pos.y, 5,5);
  }
}
