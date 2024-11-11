let jokeContainer = document.getElementById('dad-joke-container');
let jokeDiv = document.getElementById('dad-joke');
let btn = document.getElementById('get-dad-joke')

// Function to fetch a random joke from the API

async function getDadJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        jokeDiv.textContent = data.joke;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        jokeDiv.textContent = 'An error occurred while fetching the joke. Please try again later.';
    }
};

btn.addEventListener('click',function(e){
    setTimeout(()=>{
        const audio = document.querySelector('#jokesound');
        audio.currentTime = 0;
        audio.play();
    },2000);
   
});

btn.addEventListener('click', function(e) {
    jokeDiv.innerHTML = "Updating ...";
    setTimeout(()=>{
        getDadJoke();
    }, 2000);
    e.preventDefault();
});

jokeDiv.addEventListener('click', function(e) {
    navigator.clipboard.writeText(jokeDiv.textContent);
    const copied = document.createElement('copied');
    copied.style.position = 'fixed';
    copied.style.top = '50%';
    copied.style.left = '50%';
    copied.textContent = 'Copied!';
    copied.style.backgroundColor = 'white';
    copied.style.color = 'black';
    copied.style.borderRadius = '5px';
    copied.style.padding = '10px';
    copied.style.zIndex = '1000';
    copied.style.transition = 'opacity 0.3s';
    copied.style.opacity = '1';
    copied.style.fontSize = '20px';
    copied.style.display = 'block';
    copied.style.border = '1px solid black';
    copied.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(copied);
        setTimeout(() => {
            copied.parentNode.removeChild(copied);
        }, 2000);
    });