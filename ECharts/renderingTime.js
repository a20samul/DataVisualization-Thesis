// Returns data
const timeMeasurement = window.performance.timing;
// String which will hold the data values
var renderingData = "";
// seed to be able to generate same sequence (no new data is generated, same data is used each time so uncessesary?)
//var seed = 1;
// Will hold the number of iterations performed
var iterations;

// To be able to retrieve values after the page has been loaded
window.addEventListener('load', function() {
    // If the string "data" is null then an empty value is set to it and retrieved  
    if (window.localStorage.getItem("renderingData") === null) {
        window.localStorage.setItem("renderingData", "");
    }
    renderingData += window.localStorage.getItem("renderingData");

    // If the value of iteration is null then it is set to 0 and retrieved  
    if (window.localStorage.getItem("iterations") === null) {
        window.localStorage.setItem("iterations", 0);
    }
    iterations = window.localStorage.getItem("iterations");
    
    if(iterations < 1000){
        // Runs the function which contains the time measurements
        getData();
    }else{
        // Export csv file
        // Creates a link
        const downloadLink = document.createElement("a");
        // Creating a new blob containing the data values 
        const fileContent = new Blob([renderingData],{type:'text/plain'});
        // Creates the download link 
        downloadLink.href = URL.createObjectURL(fileContent);
        // Downloads the csv data through the link
        downloadLink.download='ECharts.csv';
        // Adds the link to the body and clicks it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        // Removes the link from the body
        document.body.removeChild(downloadLink);
    }
    });

// Function for retrieving time measurements 
function getData(){
    // Retrieves the value right before DOM has loaded
    renderStart = timeMeasurement.domLoading;
    // Retrieves the value after the DOM content has loaded
    renderEnd = timeMeasurement.domContentLoadedEventEnd;
    // Calculates the rendering time
    let renderingTime = (renderEnd)-(renderStart);
    // Adds the value to a string
    renderingData += renderingTime;
    // Stores the value in localstorage
    localStorage.setItem("renderingData", renderingData + ", \n");
    // Stores the incremented value of iterations in localStorage
    localStorage.setItem("iterations", ++iterations);
    // Reloads the window
    window.location.reload();
}