// Creating a variable for the div inside index.html  
var myCanvas = document.getElementById('myCanvas');

// Specifying canvas as rendering method 
var myCanvas = echarts.init(myCanvas, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

// Load and register map data
const swedenJson = require('sweden.geojson');

// Register the country map with ECharts
echarts.registerMap('sweden', swedenJson);

// Specifying the chart attributes 
var option = {
  title: {
    text: 'Choropleth map created with ECharts',
    left: 'left',
    backgroundColor: '#E3DBD9'
  },

// Tooltip attributes
  tooltip: {
    trigger: 'item',
    showDelay: 0.5,
    transitionDuration: 0.5
  },

  // Positions the scale and gives its min/max values alongside the color scheme of the bar scale
  visualMap: {
    left: 'left',
    min: 10000,
    max: 100000,
    inRange: {
      color: [
        '#98FB98',
        '#008000',
        // more colors may be added
      ]
    },
    text: ['Max value', 'Min value'],
    calculable: true
  },
  series: [
    {
      name: 'Tooltip heading',
      type: 'map',
      map: 'swedenJson',
      projection: {
        project: function (point) {
          return projection(point);
        },
        unproject: function (point) {
          return projection.invert(point);
        }
      },
      // Add data
      data: [
        { name: 'Västra Götaland', value: 5000000 },
        { name: 'Östra Götaland', value: 4890000 }
        // Add more data here
      ]
    }
  ]

};
// Draw the elements by creating or updating them to render map
myCanvas.setOption(option);
;