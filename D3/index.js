function main() {
    // alert("hello from index.js");
    svgHeight = 400;
    svgWidth = 700;

// Creates the SVG
d3.select("body")
    .append("svg")
    .attr("height", svgHeight) 
    .attr("width", svgWidth)
    .style("background-color", "lightblue")
}