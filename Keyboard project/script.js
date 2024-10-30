// Elements for displaying key information
const keyDisplay = document.getElementById("key-display");
const keyCodeDisplay = document.getElementById("keycode-display");
const keyHistoryDisplay = document.getElementById("key-history");
const keySound = document.getElementById("keypress-sound");

// Array to store key history
let keyHistory = [];

// Event listener for key presses
window.addEventListener("keydown", function(event) {
    // Play sound on key press
    keySound.currentTime = 0; // Reset sound to start
    keySound.play();

    // Display pressed key and key code
    let combination = '';
    if (event.ctrlKey) combination += 'Ctrl + ';
    if (event.shiftKey) combination += 'Shift + ';
    if (event.altKey) combination += 'Alt + ';
    combination += event.key;

    keyDisplay.textContent = `Key Pressed: ${combination}`;
    keyCodeDisplay.textContent = `Key Code: ${event.keyCode}`;

    // Update key history and display last 5 keys
    keyHistory.push(combination);
    if (keyHistory.length > 5) keyHistory.shift();
    keyHistoryDisplay.textContent = `Key History: ${keyHistory.join(", ")}`;
});
