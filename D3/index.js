function main() {
// Loads the data asynchronously
d3.queue()
  .defer(d3.json, "sweden.geojson")
  .defer(d3.csv, "", // Add data 
  function(d) { map.set(d.code, +d.pop); })
  .await(drawMap);

svgHeight = 400;
svgWidth = 1000;

// Creates the SVG with its attributes
const svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight) 
    .attr("width", svgWidth)
 
// Adds a g (container for grouping elements) to the SVG   
let g = svg.append("g") 
    
// Creates a SVG path from the data and maps the geographic projection
var projection = d3.geoMiller() // to visulize map in a certain projection
  .scale(1000)
  .center([16,63])
  .translate([svgWidth/2, svgHeight/2]);
// Converts data into SVG paths  
var geoPath = d3.geoPath(projection); 

var mapColors = ["palegreen","lightgreen", "lawngreen", "green", "darkgreen"];  

// Creates a placeholder for a map
var map = d3.map(); 

// Function which draws the map after the data has been loaded
function drawMap(error, topojson) {
  g.selectAll("path")
    .data(topojson.features)
    .enter()
    .append("path")
      // Draws the paths
      .attr("d", geoPath)
      // Assigns colour from the color scheme
      .attr("fill", function (d) {
        {
          return mapColors[d.properties.color];
        }

      });
    }
}