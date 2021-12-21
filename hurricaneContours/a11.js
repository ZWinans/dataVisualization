// 
// a11.js
// Template for CSC444 Assignment 11, Fall 2021
// Joshua A. Levine <josh@email.arizona.edu>
//
// This file provides the template code for A11, providing a skeleton
// for how to initialize and compute isocontours   
//



////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries, and helper functions

let svgSize = 490;
let bands = 49;

let xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
let yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
  return sel
    .append("svg")
    .attr("width", svgSize)
    .attr("height", svgSize);
}

function createGroups(data) {
  return function(sel) {
    return sel
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
      });
  };
}

d3.selection.prototype.callReturn = function(callable)
{
  return callable(this);
};

// This function returns the pair [min/max] for a cell d.
function gridExtent(d) {
  return [Math.min(d.NW, d.NE, d.SW, d.SE),
          Math.max(d.NW, d.NE, d.SW, d.SE)];
}



////////////////////////////////////////////////////////////////////////
// Functions for isocontouring

// Given a cell d and an isovalude value, this returns a 4-bit polarity
// signature in result.case as an integer [0,15].  Any bit that is 1
// indicates that the associate cell corner is on or above the contour.
function polarity(d, value) {
  let result = {
    NW: d.NW < value ? 0 : 1,
    NE: d.NE < value ? 0 : 1,
    SW: d.SW < value ? 0 : 1,
    SE: d.SE < value ? 0 : 1
  };
  result.case = result.NW + result.NE * 2 + result.SW * 4 + result.SE * 8;
  return result;
}

// currentContour is a global variable which stores the value
// of the contour we are currently extracting
var currentContour;

function includesOutlineContour(d) {
  let extent = gridExtent(d);
  return currentContour >= extent[0] && currentContour <= extent[1];
}

function includesFilledContour(d) {
  // TODO: WRITE THIS PART.
  let extent = gridExtent(d);
  return currentContour >= extent[0] || currentContour <= extent[1];
}

function generateOutlineContour(d) {
  // HINT: you should set up scales which, given a contour value, can be
  // used to interpolate the function along each side in the boundary of
  // the square
  let wScale = d3.scaleLinear()
      .domain([d.SW, d.NW])
      .range([0, 10])
  let eScale = d3.scaleLinear()
      .domain([d.SE, d.NE])
      .range([0, 10])
  let nScale = d3.scaleLinear()
      .domain([d.NW, d.NE])
      .range([0, 10])
  let sScale = d3.scaleLinear()
      .domain([d.SW, d.SE])
      .range([0, 10])
  
  switch (polarity(d, currentContour).case) {
    // TODO: WRITE THIS PART.
    case 0:
      break;
    case 1:

      points = [[0, wScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);

    case 2:

      points = [[10, eScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);
      
    case 3:
      
      points = [[10, eScale(currentContour)], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);

    case 4:

      points = [[0, wScale(currentContour)], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);
      
    case 5:

      points = [[sScale(currentContour), 0], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);      

    case 6:

      points = [[sScale(currentContour), 0], [nScale(currentContour), 10], [10, eScale(currentContour)], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);  

    case 7:

      points = [[10, eScale(currentContour)], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);
      
    case 8:

      points = [[10, eScale(currentContour)], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);
     
    case 9:

      points = [[sScale(currentContour), 0], [nScale(currentContour), 10], [10, eScale(currentContour)], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points); 
      
    case 10:

      points = [[sScale(currentContour), 0], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);

    case 11:
      
      points = [[0, wScale(currentContour)], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);

    case 12:

      points = [[10, eScale(currentContour)], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);

    case 13:

      points = [[10, eScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);

    case 14:

      points = [[0, wScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);

    case 15:
      break;
  }
}

function generateFilledContour(d) {
  // HINT: you should set up scales which, given a contour value, can be
  // used to interpolate the function along each side in the boundary of
  // the square
  let wScale = d3.scaleLinear()
      .domain([d.SW, d.NW])
      .range([0, 10])
  let eScale = d3.scaleLinear()
      .domain([d.SE, d.NE])
      .range([0, 10])
  let nScale = d3.scaleLinear()
      .domain([d.NW, d.NE])
      .range([0, 10])
  let sScale = d3.scaleLinear()
      .domain([d.SW, d.SE])
      .range([0, 10])
  
  switch (polarity(d, currentContour).case) {
    // TODO: WRITE THIS PART.
    case 0:
      points = [[0, 0], [10, 0], [10, 10], [0, 10]];
      return d3.line().defined(d => d !== null)(points);
    
    case 1:

      points = [[0, wScale(currentContour)], [nScale(currentContour), 10], [10, 10], [10, 0], [0, 0], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
  
    case 2:
  
      points = [[10, eScale(currentContour)], [nScale(currentContour), 10], [0, 10], [0, 0], [10, 0], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
        
    case 3:
        
      points = [[10, eScale(currentContour)], [0, wScale(currentContour)], [0, 0], [10, 0], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
  
    case 4:
  
      points = [[0, wScale(currentContour)], [sScale(currentContour), 0], [10, 0], [10, 10], [0, 10], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
        
    case 5:
  
      points = [[sScale(currentContour), 0], [nScale(currentContour), 10], [10, 10], [10, 0], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);      
  
    case 6:
  
      points = [[nScale(currentContour), 10], [0, 10], [0, wScale(currentContour)], [sScale(currentContour), 0], [10, 0], [10, eScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points);  
  
    case 7:
  
      points = [[10, eScale(currentContour)], [sScale(currentContour), 0], [10, 0], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
        
    case 8:
  
      points = [[10, eScale(currentContour)], [sScale(currentContour), 0], [0, 0], [0, 10], [10, 10], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
       
    case 9:
  
      points = [[sScale(currentContour), 0], [0, 0], [0, wScale(currentContour)], [sScale(currentContour), 0], null, [nScale(currentContour), 10], [10, 10], [10, eScale(currentContour)], [nScale(currentContour), 10]];
      return d3.line().defined(d => d !== null)(points); 
        
    case 10:
  
      points = [[sScale(currentContour), 0], [nScale(currentContour), 10], [0, 10], [0, 0], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);
  
    case 11:
        
      points = [[0, wScale(currentContour)], [sScale(currentContour), 0], [0, 0], [0, wScale(currentContour)], [sScale(currentContour), 0]];
      return d3.line().defined(d => d !== null)(points);
  
    case 12:
  
      points = [[10, eScale(currentContour)], [0, wScale(currentContour)], [0, 10], [10, 10], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
  
    case 13:
  
      points = [[10, eScale(currentContour)], [nScale(currentContour), 10], [10, 10], [10, eScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
  
    case 14:
  
      points = [[0, wScale(currentContour)], [nScale(currentContour), 10], [0, 10], [0, wScale(currentContour)]];
      return d3.line().defined(d => d !== null)(points);
  
    case 15:
      break;
    }
}



////////////////////////////////////////////////////////////////////////
// Visual Encoding portion that handles the d3 aspects


// d3 function to compute isocontours for all cells that span given a
// range of values, [minValue,maxValues], this function produces a set
// of size "steps" isocontours to be added to the selection "sel"
function createOutlinePlot(minValue, maxValue, steps, sel)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=1; i<=steps; ++i) {
    currentContour = contourScale(i);
    sel.filter(includesOutlineContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateOutlineContour)
      .attr("fill", "none")
      .attr("stroke", "black");
  }
}

// d3 function to compute filled isocontours for all cells that span
// given a range of values, [minValue,maxValues], this function produces
// a set of size "steps" isocontours to be added to the selection "sel".
// colorScale is used to assign their fill color.
function createFilledPlot(minValue, maxValue, steps, sel, colorScale)
{
  let contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
  for (let i=steps; i>=1; --i) {
    currentContour = contourScale(i);
    sel.filter(includesFilledContour).append("path")
      .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
      .attr("d", generateFilledContour)
      .attr("fill", function(d) { return colorScale(currentContour); });
  }
}

// Compute the isocontour plots
let plot1T = d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot1P = d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createOutlinePlot(-70, -60, 10, plot1T);
createOutlinePlot(-500, 200, 10, plot1P);

// Compute the filled isocontour plots
let plot2T = d3.select("#plot2-temperature")
    .callReturn(createSvg)
    .callReturn(createGroups(temperatureCells));
let plot2P = d3.select("#plot2-pressure")
    .callReturn(createSvg)
    .callReturn(createGroups(pressureCells));

createFilledPlot(-70, -60, 10, plot2T, 
              d3.scaleLinear()
                .domain([-70, -60])
                .range(["blue", "red"]));
createFilledPlot(-500, 200, 10, plot2P, 
              d3.scaleLinear()
                .domain([-500, 0, 500])
                .range(["#ca0020", "#f7f7f7", "#0571b0"]));
