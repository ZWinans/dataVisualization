// 
// buttons.js
// Buttons Example for CSC444 Assignment 05, Fall 2021
// Joshua A. Levine <josh@email.arizona.edu> and Zachary Winans <zwinans@email.arizona.edu>
//
// This file uses the button example and in addition adds scales to the file to
// handle when a button is clicked.

// Create data array
var data = new Array();

for (const [key, value] of scores.entries()) {
    data.push([value.GPA])
  }


// create scales for button clicks
let scale1 = d3.scaleLinear()
    .domain([1.704, 4.0])
    .range(["yellowgreen", "deeppink"])

let scale2 = d3.scaleLinear()
    .domain([1.704, d3.mean(data), 4.0])
    .range(["#4dac26", "#f7f7f7", "#d01c8b"])

let scale3 = d3.scaleQuantize()
    .domain([d3.min(data), d3.max(data)])
    .range(["#4dac26", "#b8e186", "#f7f7f7", "#f1b6da", "#d01c8b"])

var buttonList = [
    {
        id: "colormap-button-1",
        text: "Button 1",
        click: function() { 
    
            d3.selectAll('circle')
            .transition()
            .duration(5000)
            .style('fill', (d) => scale1(d.GPA));
    }
    },
    {
        id: "colormap-button-2",
        text: "Button 2",
        click: function() { 
            
            d3.selectAll('circle')
            .transition()
            .duration(5000)
            .style('fill', (d) => scale2(d.GPA));

         }
    },
    {
        id: "colormap-button-3",
        text: "Button 3",
        click: function() { 

            d3.selectAll('circle')
            .transition()
            .duration(5000)
            .style('fill', (d) => scale3(d.GPA));
         }
    }

];

// In the same way that we have been using d3 to create SVG elements,
// we can use d3 to create buttons and give them attributes.
//
// The only new feature in the code below is the use of the on()
// method, which defines *event handlers*.  In this case, we are
// telling d3 to call a function in the event that a button is
// clicked.

d3.select("#controls")
    .selectAll("button")
    .data(buttonList)
    .enter()
    .append("button")
    .attr("id", function(d) { return d.id; })
    .text(function(d) { return d.text; })
    .on("click", function(event, d) {
        // Since the button is bound to the objects from buttonList,
        // the expression below calls the click function from either
        // of the three button specifications in the list.
        return d.click();
    });
