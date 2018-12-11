let canvas;
let myMap;

const mappa = new Mappa('Leaflet');

const options = {
	lat: 40.73447,
	lng: -74.00232,
	zoom: 13,
	style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

var data;
let tripsCoordinates;
let allCoordinates = [];


function preload(){
	data = loadJSON('https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/taxiroutes/data/taxiday1.geojson');
}

function setup() {
	canvas = createCanvas(640,640);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);

	tripsCoordinates = myMap.geoJSON(data,'LineString');
	print(tripsCoordinates.length);
	print(tripsCoordinates);

	tripsCoordinates.forEach(function(trip){
    	trip.forEach(function(coordinate){
      		allCoordinates.push(coordinate)
    })
  });
	print(allCoordinates);

	myMap.onChange(drawPoints);
}

function draw() {
	


}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}

