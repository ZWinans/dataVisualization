/*
Author: Zachary Winans
Email: Zwinans@email.arizona.edu
Class: CSC 444, Fall 21
Assignment: 5
Purpose: The purpose of this file is to get the vis1 from index.html
and to create a scatterplot where the x axis is based on the SATV scores,
the y axis is based on the ACT scores, the radius is based on the SATM scores,
and the color is based on the GPA scores. There are three buttons where pressing
each will change the color of the buttons in various ways.
*/


// data arrays
var act = new Array();
var satv = new Array();

for (const [key, value] of scores.entries()) {
    act.push([value.ACT])
    satv.push([value.SATV])
}


// svg attributes
let svgWidth = 500;
let svgHeight = 500;

// svg scales
var xscale = d3.scaleLinear()
    .domain([250, 800])
    .range([0, svgWidth - 140]);

var yscale = d3.scaleLinear()
        .domain([36, 14])
        .range([0, svgHeight-190]);

var x_axis = d3.axisBottom()
        .scale(xscale);

var y_axis = d3.axisLeft()
        .scale(yscale);


let x_text = "SATV";
let y_text = "ACT";

// Add and initialize the svg element and a group containing the rects
let circGroup = d3.select("#vis1")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  
// Data join for rects + dataArray1 using .call()
circGroup.selectAll('circle')
  .data(scores)
  .enter()
  .append("circle")
  .call(update) //accepts a function that passes the current selection

circGroup.append("g")
  .attr("transform", "translate(94, 87)")
  .call(y_axis);

circGroup.append("g")
   .attr("transform", "translate(94, 397)")
   .call(x_axis)

circGroup.append("text")
   .attr("x", "250")
   .attr("y", "430")
   .text("SATV");

circGroup.append("text")
   .attr("x", "50")
   .attr("y", "250")
   .attr("transform", "translate(-190,300) rotate(269)")
   .text("ACT");

//by using .call() we can package up all of the attribute setting
function update(selection) {
  // Create some scales for x position and height and color
  let cxScale = d3.scaleLinear()
    .domain([d3.max(satv), 0])
    .range([svgWidth, 0])  //set a 50 pixel margin
  
  let cyScale = d3.scaleLinear()
    .domain([36, 0])
    .range([0, svgHeight])

  let rScale= d3.scaleSqrt()
    .domain([410, 800])
    .range([2, 12])

  // Update attributes
  selection
    .attr("cx", (d) => cxScale(d.SATV))
    .attr("cy", (d) => cyScale(d.ACT)) 
    .attr("r", (d) => rScale(d.SATM))
    .attr("transform", "translate(-60, 90)")
}