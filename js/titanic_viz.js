// First create the main bar chart to display the data inside the html main container
var svg = dimple.newSvg("#chartContainer", 800, 400);

// titanic-demographic.csv is a preprocessed version of the original titani-data.csv
// Preprocessing was done, and could be reproduce, with data/preprocessing_titanic.py
d3.csv("data/titanic-demographic.csv", function (data) {
  var myChart = new dimple.chart(svg, data);
  myChart.setBounds(65, 45, 505, 315);
  // Axis for main chart x, y and series
  var x = myChart.addCategoryAxis("x", ["Passenger_Class", "Demographic"]);
  x.addOrderRule("Passenger_Class");
  var y = myChart.addMeasureAxis("y", "Number_passengers");
  var s = myChart.addSeries("Status", dimple.plot.bar);
  // Default colors scheme were inverted so I assigned the expected colors using assignColor function
  myChart.assignColor("survived", "CornflowerBlue", "Black", 0.5);
  myChart.assignColor("non_survived", "Crimson", "Black", 0.5);
  // Add the Status based legend at te right of the chart
  myChart.addLegend(200, 10, 380, 20, "right");

    
  // Now I will filter the data with demographic information to create indicator chart
  data = dimple.filterData(data, "Demographic", ["male", "female", "children"]);
  // Create the indicator chart on the right of the main chart
  var indicator = new dimple.chart(svg, data);
  // Pick blue as the default and orange for the selected categorical demographic
  var defaultColor = indicator.defaultColors[0];
  var indicatorColor = indicator.defaultColors[2];
  
  // The frame duration for the animation in milliseconds
  var frame = 2000;
  var firstTick = true;
  
  // Place the indicator bar chart to the right
  indicator.setBounds(600, 70, 75, 150);
  // Add demographics along the y axis
  var y = indicator.addCategoryAxis("y", "Demographic");
  y.addOrderRule("Demographic");
  // Use Passenger Class along the x Axis
  var x = indicator.addMeasureAxis("x", "Passenger_Class");
  x.hidden = true;
  // Add the bars to the indicator and add event handlers
  var s = indicator.addSeries(null, dimple.plot.bar);
  s.addEventHandler("click", onClick);
      
  // Draw the side chart
  indicator.draw();
  // Remove the title from the y axis
  y.titleShape.remove();
  // Remove the lines from the y axis
  y.shapes.selectAll("line,path").remove();
      
  // Move the y axis text inside the plot area
  y.shapes.selectAll("text")
    .style("text-anchor", "start")
    .style("font-size", "11px")
    .style("color", "Black")
    .attr("transform", "translate(18, 0.5)");
  // This block simply adds the legend title. 
  svg.selectAll("title_text")
    .data(["Titanic Demographics",
           "Click bar to select",
           "and pause. Click again",
           "to resume animation.",
           "(*) children are 10 years old or less "])
    .enter()
    .append("text")
    .attr("x", 600)
    .attr("y", function (d, i) { return 15 + i * 12; })
    .style("font-family", "sans-serif")
    .style("font-size", "11px")
    .style("color", "Black")
    .style("font-weight", "bold")
    .text(function (d) { return d; });
      
  // Manually set the bar colors
  s.shapes
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", function (d) { return (d.y === 'male' ? indicatorColor.fill : defaultColor.fill) })
    .style("stroke", function (d) { return (d.y === 'male' ? indicatorColor.stroke : defaultColor.stroke) })
    .style("opacity", 0.4);
      
  // Add a storyboard to the main chart and set the tick event
  // Following dimplejs.org advanced example :
  // http://dimplejs.org/advanced_examples_viewer.html?id=advanced_storyboard_control
  var story = myChart.setStoryboard("Demographic", onTick);
  // Change the frame duration
  story.frameDuration = frame;
  // Order the storyboard by demographic
  story.addOrderRule("Demographic");
  
  // Draw the main chart
  myChart.draw();
  // Orphan the legends as they are consistent but by default they
  // will refresh on tick
  myChart.legends = [];
  // Remove the storyboard label because the chart will indicate the
  // current month instead of the label
  story.storyLabel.remove();
  
  // Functions for events onClick and onTick
  // On click of the side chart
  function onClick(e) {
    // Pause the animation
    story.pauseAnimation();
    // If it is already selected resume the animation
    // otherwise pause and move to the selected month
    if (e.yValue === story.getFrameValue()) {
      story.startAnimation();
    } else {
      story.goToFrame(e.yValue);
      story.pauseAnimation();
    }
  }
  
  // On tick of the main charts storyboard
  function onTick(e) {
    if (!firstTick) {
    // Color all shapes the same
    s.shapes
      .transition()
      .duration(frame / 2)
      .style("fill", function (d) { return (d.y === e ? indicatorColor.fill : defaultColor.fill) })
      .style("stroke", function (d) { return (d.y === e ? indicatorColor.stroke : defaultColor.stroke) });
    }
    firstTick = false;
  }
});
