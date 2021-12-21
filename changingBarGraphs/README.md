Template for A05
------------

Author: Zachary Winans [Zwinans@email.arizona.edu](mailto:Zwinans@email.arizona.edu)  
Date: 9/26/2021


## Notes
The purpose of this program is to take a selection of data and to create a scatterplot
that transforms the color of the points based on if one of three buttons is selected. The x axis of the plot is based on the SATV scores in the data, the y axis is based on the ACT scores in the data, the radii of the points is based on the SATM scores in the data, and the colors of the circles depend on different variations of the GPA scores (depending on which button you select). In order to use, you must open the file in a browser and then select one of the three buttons.

## Included files

* a05.js - The purpose of this file is to get the vis1 from index.html
and to create a scatterplot where the x axis is based on the SATV scores,
the y axis is based on the ACT scores, the radius is based on the SATM scores,
and the color is based on the GPA scores. There are three buttons where pressing
each will change the color of the buttons in various ways.

* buttons.js - This file uses the button example provided by the professor and in addition adds scales to the file to properly change all colors of the points when one of the three buttons is selected.

* style.css - To create the style of our vis

* calvinScores.js - This file includes a Javascript array that contains standardized
scores for all Calvin College 2004 seniors that have taken both the
ACT and the SAT, together with their GPAs. There are 271 data points
and 4 dimensions. 

* d3.js - This file contains the library that we will be using primarily in our buttons.js and a05.js files. It contains many helpful functions to help us create our visualization.

* index.html - This file serves as the view of our program, contains the buttons as well
as the vis1 to change in our a05.js file.

## References


