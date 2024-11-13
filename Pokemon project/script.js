// script.js

const pokemonContainer = document.getElementById("pokemon-container");
const typeFilter = document.getElementById("type-filter");
const searchInput = document.getElementById("search");
const resetButton = document.getElementById("reset");

// Fetch Pokémon types to populate the type filter dropdown
async function fetchTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type/');
    const data = await response.json();
    populateTypeFilter(data.results);
}

// Populate type filter dropdown with available types
function populateTypeFilter(types) {
    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type.name;
        option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        typeFilter.appendChild(option);
    });
}

// Fetch the first 200 Pokémon and display them
async function fetchPokemonData(type = '') {
    let url = type ? `https://pokeapi.co/api/v2/type/${type}` : 'https://pokeapi.co/api/v2/pokemon?limit=200';
    const response = await fetch(url);
    const data = await response.json();
    const pokemons = type ? data.pokemon.map(p => p.pokemon) : data.results;
    displayPokemons(pokemons);
}

// Display Pokémon cards in the UI
function displayPokemons(pokemons) {
    pokemonContainer.innerHTML = '';
    pokemons.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();
        createPokemonCard(pokeData);
    });
}

// Create individual Pokémon card with front and back details
function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    // Get type(s) of the Pokémon and format them
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <p>Type: ${types}</p> <!-- Display type here -->
            </div>
            <div class="card-back">
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            </div>
        </div>
    `;
    pokemonContainer.appendChild(card);
}

// Event listeners for filter and search functionality
typeFilter.addEventListener("change", () => {
    const selectedType = typeFilter.value;
    fetchPokemonData(selectedType);
});

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".pokemon-card");
    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
    });
});

resetButton.addEventListener("click", () => {
    typeFilter.value = '';
    searchInput.value = '';
    fetchPokemonData();
});

// Initialize by fetching types and the first 200 Pokémon
fetchTypes();
fetchPokemonData();
