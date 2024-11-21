# Movie Search Application

A responsive and user-friendly movie search application that allows users to search for movies, view search results with pagination, and explore detailed movie information.

## 🚀 Hosted Link
[Movie Search Application]

## 🎯 Features

### 1. User Interface (UI) Design
- A visually appealing and intuitive design for a seamless user experience.
- Responsive layout ensuring compatibility with various screen sizes (desktop, tablet, and mobile).
- Consistent use of fonts, colors, and layouts for a professional and user-friendly design.

### 2. Movie Data API Integration
- Integrated with the OMDB API to fetch movie data.
- Search functionality allows users to find movies by title.
- Display of search results includes movie titles, posters, and brief descriptions.

### 3. Debouncing Effect
- Implemented debouncing on the search input field for better performance.
- API requests are triggered after a short delay of user inactivity, reducing unnecessary calls.

### 4. Search Functionality
- The search functionality is triggered after the debounce delay, fetching results from the OMDB API.
- Handles edge cases such as:
  - Empty search queries with appropriate alerts.
  - Error responses with user feedback (e.g., "No movie found").
  - Loading indicators during the search process.
- Pagination implemented to navigate through results.

### 5. Movie Details Page
- Clicking on a movie result displays more details about the selected movie.
- Additional information includes:
  - Title
  - Director
  - Genre
  - IMDB Rating
  - Plot summary
- Pagination maintained for navigation through search results.

---

## 🛠️ Technologies Used
- **HTML**: Structure of the application.
- **CSS**: Styling for UI design and animations.
- **JavaScript**: Logic for API integration, search functionality, and debouncing.
- **OMDB API**: Data source for movie information.


## 🚧 Future Enhancements
- Add more filters (e.g., by year, genre, or type).
- Include a "favorites" feature to save movies.
- Enhance UI animations for a more dynamic experience.

