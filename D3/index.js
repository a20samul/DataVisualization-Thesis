function main() {
// console.log(d3);
//console.log(topojson);

  svgHeight = 400;
    svgWidth = 1000;

// Creates the SVG with its attributes
const svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight) 
    .attr("width", svgWidth)
    
// Creates a SVG path from the data and maps the geographic projection
var projection = d3.geoMiller() // to visulize map in a certain projection
  .scale()
  .center([,])
  .translate([svgWidth / 2, svgHeight / 2]);
var path = d3.geoPath(projection); // converts data into SVG paths    
}