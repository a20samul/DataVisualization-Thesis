function main() {
  svgHeight = 450;
  svgWidth = 1000;

  // Loads the data asynchronously
  d3.queue()
  // .defer(d3.json, "countiesSWE.geojson")
  .defer(d3.json, "sweden.geojson")
  .defer(d3.csv, "swelan.csv" ,function (d) { map.set(d.name, +d.population); })
  .await(drawMap);

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
    .center([16, 63])
    .translate([svgWidth / 2, svgHeight / 2]);
  // Converts data into SVG paths  
  var geoPath = d3.geoPath(projection);

  // Color scheme of the map
  var color = d3.scaleLinear()
  .domain([130000, 150000, 230000, 250000, 310000, 340000, 600000, 1000000, 2300000])
  .range(d3.schemeGreens[9]);

  // Creates a placeholder for a map
  var map = d3.map();

  // Function which draws the map after the data has been loaded
  function drawMap(error, data, population) {
    g.selectAll("path")
      .data(data.features)
      .enter() 
      .append("path")
      // Draws the paths
        .attr("d", geoPath)
        // Assigns colour from the color scheme
        .attr("fill", function (d) {
          {         
            d.allAreas = map.get(d.properties.name) || 0;
            return color(d.allAreas);        }
        })
        .on("mouseover", function(d)  {
          d3.select(this).classed("hoverArea", true)
        })
        .on("mouseleave", function(d)  {
          d3.select(this).classed("hoverArea", false)
        });
  }
}