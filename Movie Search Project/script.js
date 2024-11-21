// DOM methods for selecting HTML elements
const container = document.querySelector(".movie_container");
const input_box = document.querySelector("#search_tag");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const page = document.querySelector("#page_no");
const pagination = document.querySelector(".pagination");

let pageNo = 1;
let debounceTimeout;

// Function for fetching data using API
async function fetchData(title, pageNo) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=b7ff02da&s=${encodeURIComponent(
      title.trim()
    )}&page=${pageNo}`
  );

  const data = await response.json();
  console.log(data);
  
  return data;
}

// Debouncing function
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Function to handle fetching and displaying movies
async function handleSearch() {
  let title = input_box.value;

  if (title.trim() === "") {
    container.innerHTML = "";
    pagination.style.display = "none";
    return;
  }

  container.innerHTML = "Loading...";
  let data = await fetchData(title, pageNo);

  if (data.Response === "False") {
    container.innerHTML = "No movie found";
    pagination.style.display = "none";
    return;
  }

  container.innerHTML = "";
  userData(data);
  pagination.style.display = "flex";
}

// Attach debounced input event listener
input_box.addEventListener("input", debounce(handleSearch, 800));

// Right pagination button
rightBtn.addEventListener("click", async () => {
  leftBtn.disabled = false;
  let title = input_box.value;

  page.innerText++;
  pageNo = page.innerText;

  container.innerHTML = "Loading...";
  let data = await fetchData(title, pageNo);

  container.innerHTML = "";
  userData(data);
});

// Left pagination button
leftBtn.addEventListener("click", async () => {
  if (pageNo <= 1) {
    leftBtn.disabled = true;
    return;
  }

  let title = input_box.value;
  page.innerText--;
  pageNo = page.innerText;

  container.innerHTML = "Loading...";
  let data = await fetchData(title, pageNo);

  container.innerHTML = "";
  userData(data);
});

// Function for UI data
function userData(data) {
  data.Search.forEach((element) => {
    const card = document.createElement("div");
    card.className = "movie_card";
    const image = document.createElement("img");
    image.src = element.Poster;
    image.className = "movie_image";
    card.appendChild(image);
    container.appendChild(card);

    card.addEventListener("click", async () => {
      let imdbId = element.imdbID;
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=b7ff02da&i=${imdbId}`
      );

      const data = await response.json();

      const name = document.createElement("h5");
      const director = document.createElement("h5");
      const genre = document.createElement("h5");
      const rating = document.createElement("h5");
      const type = document.createElement("h5");
      const div = document.createElement("div");
      const image = document.createElement("img");
      const crossBtn = document.createElement("button");

      crossBtn.innerText = "X";
      crossBtn.className = "close";
      director.innerText = `Director :- ${data.Director}`;
      genre.innerText = `Genre :- ${data.Genre}`;
      rating.innerText = `IMDB Rating :- ${data.imdbRating}`;
      name.innerText = `Title :- ${data.Title}`;
      type.innerText = `Type :- ${data.Type}`;
      image.src = element.Poster;
      image.className = "movie_image2";
      div.className = "moreInfo";

      div.appendChild(crossBtn);
      div.appendChild(image);
      div.appendChild(name);
      div.appendChild(director);
      div.appendChild(genre);
      div.appendChild(type);
      div.appendChild(rating);

      container.appendChild(div);

      crossBtn.addEventListener("click", () => {
        div.style.display = "none";
      });
    });
  });
}
