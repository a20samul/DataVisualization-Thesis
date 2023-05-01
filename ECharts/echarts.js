// Creating a variable for the div inside index.html  
var myCanvas = document.getElementById('myCanvas');

// Specifying canvas as rendering method 
var myMap = echarts.init(myCanvas, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

// Fetch data asynchronously 
$.when(
  $.get('sweden.geojson'),
  $.getScript('https://fastly.jsdelivr.net/npm/d3-array'),
  $.getScript('https://fastly.jsdelivr.net/npm/d3-geo')
).done(function (mapGeoJSON) {

  /*var seed;
  if (window.localStorage.getItem("seed") === null) {
    window.localStorage.setItem("seed", 1);
  }
  seed = window.localStorage.getItem("seed"); */

// Randomizes integer values between 132670 and 2440027
function randomisedCountyValue() {
  var countyValue = Math.floor(Math.random() * (2440027 - 132670) + 132670);
  return countyValue;
} 
//localStorage.setItem("seed", ++seed);
//console.log(seed);

// Register the country map with ECharts
echarts.registerMap('Sweden', mapGeoJSON[0]);

// Specifying the chart attributes 
var option = {
  title: {
    text: 'Choropleth map created with ECharts',
    left: 'left',
    backgroundColor: '#E3DBD9',
    padding: 10,
    top: 5
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
    min: 130000,
    max: 3000000,
    inRange: {
      color: [
        "#f5fbf2",
        "#369e54", 
        "#359d53",
        "#2d954d", 
        "#04662a", 
        "#004d1f", 
        "#00491d",
        "#00451c",
        "#00441b"
      ]
    },
    text: ['Population'],
    calculable: true
  },
  series: [
    {
      name: 'Befolkningsmängd',
      type: 'map',
      map: 'Sweden',
      emphasis: {
        label: {
          show: true
        }
      },
      // Add data
      data: [
        { name: 'Blekinge', value: 158740 },
        { name: 'Dalarna', value: 288310 },
        { name: 'Gotland', value: 61173 },
        { name: 'Gävleborg', value: 287334 },
        { name: 'Halland', value: 342805},
        { name: 'Jämtland', value: 132670 },
        { name: 'Jönköping', value: 369113 },
        { name: 'Kalmar', value: 247711 },
        { name: 'Kronoberg', value: 204335 },
        { name: 'Norrbotten', value: 249177 },
        { name: 'Skåne', value: 1414324 },
        { name: 'Stockholm', value: 2440027 },
        { name: 'Södermanland', value: 302566 },
        { name: 'Uppsala', value: 400682 },
        { name: 'Värmland', value: 283976 },
        { name: 'Västerbotten', value: 276295 },
        { name: 'Västernorrland', value: 243265 },
        { name: 'Västmanland', value: 280713 },
        { name: 'Västra Götaland', value: 1758656 },
        { name: 'Örebro', value: 307772 },
        { name: 'Östergötland', value: 471912 }
      ]
    }
  ]
};
// Draw the elements by creating or updating them to render map
myMap.setOption(option);
});