import { GoogleGenerativeAI } from "@google/generative-ai";

// Placeholder for API keys
const UNSPLASH_API_KEY = "2R1VzG4x4BHU4XmhGYgAFlJi7Ql05l829XOPS1SmSdU";
const GOOGLE_API_KEY = "28f0d22157msha41414361cb81abp1eb3b8jsne3708e88567b";
const GEMINI_API_KEY = "AIzaSyAW0oQhxol9dX5xAaz00wvSp4259-Ipyzc";
const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

// Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const historyList = document.getElementById("history-list");
const googleResultsDiv = document.querySelector("#google-results .content");
const unsplashResultsDiv = document.querySelector("#unsplash-results .content");
const wikipediaResultsDiv = document.querySelector(
  "#wikipedia-results .content"
);
const geminiResultsDiv = document.querySelector("#gemini-results .content");

// Initialize Google Generative AI client


// Tab switching logic
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => content.classList.remove("active"));
      // Show the corresponding tab content
      const target = button.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  // Load search history on page load
  loadSearchHistory();
});

// Save search history in local storage
function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 5) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

// Load search history
function loadSearchHistory() {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyList.innerHTML = history.map((item) => `<li>${item}</li>`).join("");
}

// Fetch Google Search Results
async function fetchGoogle(query) {
  const url = `https://google-search74.p.rapidapi.com/?query=${encodeURIComponent(
    query
  )}&limit=10&related_keywords=true`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": GOOGLE_API_KEY,
      "x-rapidapi-host": "google-search74.p.rapidapi.com",
    },
  };

  try {
    googleResultsDiv.innerHTML = "Loading...";
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch Google search results");
    const data = await response.json();

    const results = data.results
      .map(
        (result) =>
          `<p><a href="${result.link}" target="_blank">${result.title}</a>: ${result.description}</p>`
      )
      .join("");
    googleResultsDiv.innerHTML = results;
  } catch (error) {
    console.error("Google API error:", error);
    googleResultsDiv.innerText = "Error loading Google search results.";
  }
}

// Fetch Unsplash Images
async function fetchUnsplash(query) {
  try {
    unsplashResultsDiv.innerHTML = "Loading...";
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=10`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch Unsplash data");
    const data = await response.json();

    const images = data.results
      .map(
        (img) =>
          `<img src="${img.urls.thumb}" alt="${img.alt_description}" title="${img.alt_description}">`
      )
      .join("");
    unsplashResultsDiv.innerHTML = images;
  } catch (error) {
    console.error("Unsplash API error:", error);
    unsplashResultsDiv.innerText = "Error loading Unsplash images.";
  }
}

// Fetch Wikipedia Data
async function fetchWikipedia(query) {
  try {
    wikipediaResultsDiv.innerHTML = "Loading...";
    const response = await fetch(
      `${WIKIPEDIA_API_URL}?action=query&format=json&list=search&srsearch=${query}&origin=*`
    );
    if (!response.ok) throw new Error("Failed to fetch Wikipedia data");
    const data = await response.json();

    const results = data.query.search
      .map((item) => `<p><strong>${item.title}</strong>: ${item.snippet}</p>`)
      .join("");
    wikipediaResultsDiv.innerHTML = results;
  } catch (error) {
    console.error("Wikipedia API error:", error);
    wikipediaResultsDiv.innerText = "Error loading Wikipedia data.";
  }
}


const genAI = new GoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Fetch Gemini Data Using Google Generative AI Library
async function fetchGemini(query) {
  try {
    const prompt = `Provide detailed information about "${query}". Include key facts, history, uses, and interesting insights.`;

    geminiResultsDiv.innerHTML = "Loading...";

    let result = await model.generateContent(prompt);

    let data = await result.response.text();

    geminiResultsDiv.innerHTML = data;
  } catch (error) {
    console.error("Gemini API error:", error);
    geminiResultsDiv.innerHTML = "Error loading Gemini data.";
  }
}

// Handle Search
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  saveSearchHistory(query);
  loadSearchHistory();
  fetchGoogle(query);
  fetchUnsplash(query);
  fetchWikipedia(query);
  fetchGemini(query);
}

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
