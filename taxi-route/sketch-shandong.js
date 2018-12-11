let canvas;
let myMap;

const mappa = new Mappa('Leaflet');

const options = {
	lat: 36,
	lng: 117.5,
	zoom: 6.5,
	style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

var data;
let multiPolygons;
let allCoordinates = [];



function preload(){
	data = loadJSON('https://raw.githubusercontent.com/d3cn/data/master/json/geo/china/province-city/shandong.geojson');
  print("show data");
  print(data);
}

function setup() {
	canvas = createCanvas(800, 700);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);

	multiPolygons = myMap.geoJSON(data,'Polygon');
	print(multiPolygons.length);
  print(multiPolygons);

  multiPolygons1 = multiPolygons[8];
  print(multiPolygons1);

// all province

 // multiPolygons.forEach(function(trip0){
 //    trip0.forEach(function(trip){
 //    	trip.forEach(function(coordinate){
 //    		allCoordinates.push(coordinate)
 //      })
 //    })
 //  });

 // single province
     multiPolygons1.forEach(function(trip){
      trip.forEach(function(coordinate){
        allCoordinates.push(coordinate)
      })
    })


  	print(allCoordinates);

  	myMap.onChange(drawPoints);
}

function draw() {


}

function drawPoints(){
  clear() 
  noStroke();
  fill(134, 226, 213);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }

//   for(let i = 0; i < multiPolygons.length; i++){
//     for(var k = 0; k < multiPolygons[i].length; k++){
//       beginShape();
//       for (var j = 0; j < multiPolygons[i][k][0].length; j ++){
//         var pos = myMap.latLngToPixel(multiPolygons[i][k][0][j][1], multiPolygons[i][k][0][j][0]);
//         vertex(pos.x, pos.y);
//       }
//   	endShape();
//   }
// }
}

