const jsonUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to fetch the JSON file
d3.json(jsonUrl).then(function(data) {
  // Assuming the data is an array of samples
  const samples = data.samples;

  // Sort samples by sample_values for the first sample
  let sortedSample = samples[0].sample_values.slice(0).sort((a, b) => b - a);
  let top10SampleValues = sortedSample.slice(0, 10);
  top10SampleValues.reverse();

  // Get corresponding otu_ids and otu_labels
  let top10OtuIds = samples[0].otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
  let top10OtuLabels = samples[0].otu_labels.slice(0, 10).reverse();

  // Create trace for bar chart
  let trace1 = {
    x: top10SampleValues,
    y: top10OtuIds,
    text: top10OtuLabels,
    type: "bar",
    orientation: "h"
  };

  let data = [trace1];

  let layout = {
    title: "Top 10 OTUs per Sample",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  
  Plotly.newPlot("plot", data, layout);

  // Create dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Populate dropdown with sample IDs
  samples.forEach(sample => {
    dropdownMenu.append("option").text(sample.id).property("value", sample.id);
  });

  // Set up event listener for dropdown change
  dropdownMenu.on("change", updatePlot);
  
  // Initial plot for the first sample
  updatePlot();

  function updatePlot() {
    let selectedSampleID = dropdownMenu.property("value");
    let selectedSample = samples.find(sample => sample.id === selectedSampleID);

    let traceUpdate = {
      x: selectedSample.sample_values.slice(0, 10).reverse(),
      y: selectedSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: selectedSample.otu_labels.slice(0, 10).reverse()
    };

    // Update the existing plot
    Plotly.update("plot", [traceUpdate]);
  }
}).catch(function(error) {
  
  console.error("Error loading JSON data:", error);
});
