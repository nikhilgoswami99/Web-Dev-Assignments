const homeLink = document.getElementById('home-link');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const logoutLink = document.getElementById('logout-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const productsSection = document.getElementById('products-section');
const productsContainer = document.getElementById('products-container');
const productDetail = document.getElementById('product-detail');
const productDetailContent = document.getElementById('product-detail-content');
const backBtn = document.getElementById('back-btn');
const loginFormElement = document.getElementById('login-form-element');
const signupFormElement = document.getElementById('signup-form-element');
const toSignup = document.getElementById('to-signup');
const toLogin = document.getElementById('to-login');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const filterBtn = document.getElementById('filter-btn');
const themeToggle = document.getElementById('theme-toggle');



// Variables
let allProducts = [];
let filteredProducts = [];
let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

// Check if user is logged in
function checkLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block';
        showProducts();
    } else {
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        logoutLink.style.display = 'none';
        showLoginForm();
    }
}

// Event Listeners
homeLink.addEventListener('click', function(e) {
    e.preventDefault();
    checkLoggedIn();
});

loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});

signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    showSignupForm();
});

logoutLink.addEventListener('click', function(e) {
    e.preventDefault();
    logout();
});

loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    login();
});

signupFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    signup();
});

toSignup.addEventListener('click', function(e) {
    e.preventDefault();
    showSignupForm();
});

toLogin.addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});

backBtn.addEventListener('click', function() {
    productDetail.style.display = 'none';
    productsSection.style.display = 'block';
});

filterBtn.addEventListener('click', applyFilters);

themeToggle.addEventListener('click', toggleTheme);

// Functions
function showLoginForm() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    productsSection.style.display = 'none';
    productDetail.style.display = 'none';
}

function showSignupForm() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    productsSection.style.display = 'none';
    productDetail.style.display = 'none';
}

function showProducts() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    productsSection.style.display = 'block';
    productDetail.style.display = 'none';
    
    fetchProducts();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        checkLoggedIn();
    } else {
        alert('Invalid email or password');
    }
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
        alert('Email already exists');
        return;
    }
    
    const newUser = {
        name,
        email,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    showLoginForm();
}

function logout() {
    localStorage.removeItem('loggedInUser');
    checkLoggedIn();
}

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            filteredProducts = [...allProducts];
            renderProducts(filteredProducts);
            populateCategories(data);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilter.appendChild(option);
    });
}

function renderProducts(products) {
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    products.forEach(product => {
        const isLiked = likedProducts.includes(product.id);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-category">${product.category}</p>
            </div>
            <div class="like-btn ${isLiked ? 'liked' : ''}" data-id="${product.id}">
                ${isLiked ? '❤️' : '🤍'}
            </div>
        `;
        
        productCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('like-btn')) {
                showProductDetail(product);
            }
        });
        
        const likeBtn = productCard.querySelector('.like-btn');
        likeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLike(product.id, likeBtn);
        });
        
        productsContainer.appendChild(productCard);
    });
}

function toggleLike(productId, likeBtn) {
    const index = likedProducts.indexOf(productId);
    
    if (index === -1) {
        likedProducts.push(productId);
        likeBtn.classList.add('liked');
        likeBtn.textContent = '❤️';
    } else {
        likedProducts.splice(index, 1);
        likeBtn.classList.remove('liked');
        likeBtn.textContent = '🤍';
    }
    
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

function showProductDetail(product) {
    productDetailContent.innerHTML = `
        <div class="product-detail-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-detail-info">
            <h2 class="product-detail-title">${product.title}</h2>
            <p class="product-detail-price">$${product.price.toFixed(2)}</p>
            <p class="product-detail-desc">${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Rating:</strong> ${product.rating.rate}/5 (${product.rating.count} reviews)</p>
        </div>
    `;
    
    productsSection.style.display = 'none';
    productDetail.style.display = 'block';
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceSort = priceFilter.value;
    
    let filtered = [...allProducts];
    
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
   
    if (priceSort === 'low-to-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-to-low') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    filteredProducts = filtered;
    renderProducts(filteredProducts);
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}


function init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    checkLoggedIn();
}


init();