// This code was used to be able to use the same data in both applications by converting the same data into its correct and specific structure for Apache ECharts

// String which will hold all the values
var dataStructure = "";
// Will hold the correct structure of the data which in turn is inserted and will be added to the dataStructure string
var populationData;

// If the string "dataStructure" is null then an empty value is set to it and retrieved  
if (window.localStorage.getItem("dataStructure") === null) {
    window.localStorage.setItem("dataStructure", "");
}
dataStructure += window.localStorage.getItem("dataStructure");

// Function which will provide the data with the correct structure
d3.csv("population-and-demography.csv", function(data) {    
    // A forEach loop that will iterate the data needed from the CSV-file and grant the correct structure
    data.forEach(function(d) {
    populationData = ("{ name: " + "'"+d.name+"'" + ", " + "value: " + d.value + " }" + ", ");
    dataStructure += populationData;
    });
    //populationData.push("{ name: " + "'Antarctica'" + ", " + "value: 20000000" + "}");
    localStorage.setItem("dataStructure", dataStructure + "\n");
});
console.log(dataStructure);
  
// Export csv file with the correct data structure
// Creates a link
const downloadLink = document.createElement("a");
// Creating a new blob containing the data values 
const fileContent = new Blob([dataStructure],{type:'text/plain'});
// Creates the download link 
downloadLink.href = URL.createObjectURL(fileContent);
// Downloads the csv data through the link
downloadLink.download='populationData.csv';
// Adds the link to the body and clicks it
document.body.appendChild(downloadLink);
downloadLink.click();
// Removes the link from the body
document.body.removeChild(downloadLink);