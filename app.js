// Specify the path to your JSON file
var jsonFilePath = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to load the JSON data
d3.json(jsonFilePath).then(function(data) {
  // Log the loaded data to the console to verify
  console.log(data);

  // Initialize the page
  init(data);
});

// Function to initialize the page
function init(data) {
  // Populate dropdown menu with Test Subject IDs
  var dropdown = d3.select("#selDataset");

  data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
  });

  // Initial data rendering
  var initialSubjectId = data.names[0];
  updateCharts(data, initialSubjectId);
}

// Function to update charts based on selected Test Subject ID
function optionChanged(selectedSubjectId) {
  updateCharts(data, selectedSubjectId);
}

// Function to update charts with data for the selected Test Subject ID
function updateCharts(data, subjectId) {
  var selectedSample = data.samples.find(sample => sample.id === subjectId);

  // Sort the data and get the top 10 values
  var sortedData = selectedSample.sample_values.slice().sort((a, b) => b - a);
  var topValues = sortedData.slice(0, 10);

  // Reverse the arrays for horizontal bar chart
  var reversedValues = topValues.reverse();
  var reversedIds = selectedSample.otu_ids.slice(0, 10).reverse();
  var reversedLabels = selectedSample.otu_labels.slice(0, 10).reverse();

  // Create the trace for the bar chart
  var trace1 = {
    x: reversedValues,
    y: reversedIds.map(id => `OTU ${id}`),
    text: reversedLabels,
    type: "bar",
    orientation: "h"
  };

  // Data array for the plot
  var barData = [trace1];
// Layout for the bar chart
var barLayout = {
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  // Update the bar chart
  Plotly.newPlot("bar", barData, barLayout);
};

// Specify the path to your JSON file
var jsonFilePath = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to load the JSON data
d3.json(jsonFilePath).then(function(data) {
  // Log the loaded data to the console to verify
  console.log(data);

  // Initialize the page
  init(data);
});

// Function to initialize the page
function init(data) {
  // Populate dropdown menu with Test Subject IDs
  var dropdown = d3.select("#selDataset");

  data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
  });

  // Initial data rendering
  var initialSubjectId = data.names[0];
  updateCharts(data, initialSubjectId);
}

// Function to update charts based on selected Test Subject ID
function optionChanged(selectedSubjectId) {
  updateCharts(data, selectedSubjectId);
}

// Function to update charts with data for the selected Test Subject ID
function updateCharts(data, subjectId) {
  var selectedSample = data.samples.find(sample => sample.id === subjectId);

  // Bar Chart
  var sortedData = selectedSample.sample_values.slice().sort((a, b) => b - a);
  var topValues = sortedData.slice(0, 10);
  var reversedValues = topValues.reverse();
  var reversedIds = selectedSample.otu_ids.slice(0, 10).reverse();
  var reversedLabels = selectedSample.otu_labels.slice(0, 10).reverse();

  var trace1 = {
    x: reversedValues,
    y: reversedIds.map(id => `OTU ${id}`),
    text: reversedLabels,
    type: "bar",
    orientation: "h"
  };

  var barData = [trace1];

  var barLayout = {
    title: `Top 10 OTUs for Test Subject ${subjectId}`,
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", barData, barLayout);

  // Bubble Chart
  var trace2 = {
    x: selectedSample.otu_ids,
    y: selectedSample.sample_values,
    mode: "markers",
    marker: {
      size: selectedSample.sample_values,
      color: selectedSample.otu_ids,
      colorscale: "Earth"
    },
    text: selectedSample.otu_labels
  };

  var bubbleData = [trace2];

  var bubbleLayout = {
    title: `OTU Bubble Chart for Test Subject ${subjectId}`,
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values" }
  };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
};



