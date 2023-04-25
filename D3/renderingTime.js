// Returns data
const timeMeasurement = window.performance.timing;
// String which will hold the data values
var renderingData = "";

// To be able to retrieve values after the page has been loaded
window.addEventListener('load', function() {
    // If the string "data" is null then an empty value is set to it and retrieved  
    if (window.localStorage.getItem("renderingData") === null) {
        window.localStorage.setItem("renderingData", "");
    }
    renderingData += window.localStorage.getItem("renderingData");

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
    // Adds the value to a string
    renderingData += renderingTime;
    // Stores the value in localstorage
    localStorage.setItem("renderingData", renderingData + ", \n");

    console.log(timeMeasurement);
    console.log(renderStart);
    console.log(renderEnd);
    console.log(renderEnd-renderStart);
    console.log("rendering time: " + renderingTime);
    // Reloads the window
    //window.location.reload();
    

}