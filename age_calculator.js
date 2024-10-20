// Select the input, button, and paragraph elements
const ageInput = document.getElementById('age');
const button = document.querySelector('button');
const ageDisplay = document.querySelector('p');

// Function to calculate age based on the date of birth
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Adjust the age if the birth month/day hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Event listener for button click
button.addEventListener('click', () => {
    const dateOfBirth = ageInput.value;

    if (dateOfBirth) {
        const age = calculateAge(dateOfBirth);
        ageDisplay.innerText = `Your age is ${age} years old`;
    } else {
        alert("Please enter your birthday");
    }
});
