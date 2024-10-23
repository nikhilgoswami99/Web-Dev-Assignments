DOM Manipulation Project
Overview
This project demonstrates basic DOM manipulation using JavaScript to dynamically change the appearance of a div element. The project emphasizes UI consistency across all steps, ensuring elements are properly aligned and visually appealing for a smooth user experience.

Features
Consistent UI: Ensures that the user interface remains visually appealing and aligned across the project.
DOM Manipulation: Uses JavaScript to change various styles of a div element, such as background color, margin, padding, font size, font weight, height, and width.
JavaScript Functions: Uses the getElementById method to retrieve and manipulate the target div element, demonstrating how to style HTML elements dynamically.
Instructions
1. Retrieving the Element
The div element with the ID container is fetched using the getElementById method:
const div = document.getElementById("container");

2. Styling the Element
The following style properties are dynamically applied to the container div using JavaScript:

Background color is changed to yellow (rgb(255, 255, 0)).
Margin of 20 pixels.
Padding of 10 pixels.
Font size set to 18 pixels.
Font weight set to bold.
Height set to 200 pixels.
Width set to 300 pixels.
Text color changed to blue.
Example JavaScript:
const div = document.getElementById("container");

div.style.backgroundColor = "rgb(255, 255, 0)";
div.style.margin = "20px";
div.style.padding = "10px";
div.style.fontSize = "18px";
div.style.fontWeight = "bold";
div.style.height = "200px";
div.style.width = "300px";
div.style.color = "blue";

Hosted Version
You can view the live version of the project by clicking on the following link:

Hosted Link - https://nikhilgoswami99.github.io/Web-Dev-Assignments/DOM_Manipulation/index.html