// Returns data
const timeMeasurement = window.performance.timing;

// To be able to retrieve values after the page has been loaded
window.addEventListener('load', function() {
    getData();
});

// Function for retrieving time measurements 
function getData(){
    // Retrieves the value right before DOM has loaded
    renderStart = timeMeasurement.responseEnd;
    // Retrieves the value after the DOM content has loaded
    renderEnd = timeMeasurement.domContentLoadedEventEnd;
    // Calculates the rendering time
    let renderingTime = (renderEnd)-(renderStart);

    console.log(timeMeasurement);
    console.log(renderStart);
    console.log(renderEnd);
    console.log(renderEnd-renderStart);
    console.log("rendering time: " + renderingTime);
    // Reloads the window
    //window.location.reload();
    

}