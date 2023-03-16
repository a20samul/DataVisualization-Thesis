// naming the div inside index.html as the variable dom
var dom = document.getElementById('chart-container');

// Specifying canvas as rendering method 
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});