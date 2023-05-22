  svgHeight = 870;
  svgWidth = 1810;

  // Loads the data 
 d3.queue()
  .defer(d3.json, "us-county-boundaries.geojson")
  .defer(d3.csv, "countydata.csv" ,function (d) { map.set(d.name, +d.population); })
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
    .scale(690)
    .center([-120, 48])
    .translate([svgWidth / 2, svgHeight / 2]);
  // Converts data into SVG paths  
  var geoPath = d3.geoPath(projection);

  // Color scheme of the map
  var color = d3.scaleLinear()
  .domain([1000, 5000, 10000, 15000, 30000, 60000, 120000, 240000, 60000])
  .range(d3.schemeGreens[9]);

  // Creates a placeholder for a map
  var map = d3.map();

  // Creates a tooltip
  const tooltip = d3.select("body")
    .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // Function which draws the map after the data has been loaded
  function drawMap(error, data) {
    g.selectAll("path")
      .data(data.features)
      .enter() 
      .append("path")
      // Draws the paths
        .attr("d", geoPath)
        // Assigns colour from the color scheme
        .attr("fill", function (d) {
          {         
            d.population = map.get(d.properties.name);
            return color(d.population);        }
        }) // Adds hovering effect and tooltip on mouseover
        .on("mouseover", function(d)  {
          d3.select(this).classed("hoverArea", true);
          tooltip
            .style("opacity", 1)
            .style("top", (d3.event.pageY + 14) + "px")
            .style("left", (d3.event.pageX + 22) + "px")
            .transition()
            .duration(300)
            .text("County: " + d.properties.name + ', Population: ' + d.population);
        }
      ) // Removes hovering effect and tooltip on mouseleave
        .on("mouseleave", function(d)  {
          d3.select(this).classed("hoverArea", false);
          tooltip
            .transition()
            .duration(500)
            .style("opacity", 0);
        });
  }