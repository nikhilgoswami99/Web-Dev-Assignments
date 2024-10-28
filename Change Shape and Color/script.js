let round = document.querySelector(".round");
let btn = document.querySelectorAll("button");
let shape = document.querySelector("#diamond");  // Ensure this targets the shape within .round

// Function to generate a random color
function generateColor() {
    return Math.floor(Math.random() * 255);
}

// Function to change the color of the shape container
function changeColor() {
    let newColor = `rgb(${generateColor()}, ${generateColor()}, ${generateColor()})`;
    round.style.backgroundColor = newColor;
}

// Add click event to the first button for changing color
btn[0].addEventListener("click", changeColor);

// Array of shape IDs to randomly select from
let arr = ["square", "round", "diamond", "triangle", "arrow", "frame", "star", "cross", "left-point", "right-point", "parallal", "cheg"];

// Function to select a random shape ID from the array
function randomShape() {
    let idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

// Function to change the shape by updating the `id` of the shape element
function changeShape() {
    let newShape = randomShape();
    shape.id = newShape;  // Change the id of the shape div inside the .round container
}

// Add click event to the second button for changing shape
btn[1].addEventListener("click", changeShape);
