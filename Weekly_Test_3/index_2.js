const products = [
    { id: 1, name: "Product-1", price: 100 },
    { id: 2, name: "Product-2", price: 200 },
    { id: 3, name: "Product-3", price: 300 },
];

let remove_btns = document.querySelectorAll(".remove");
let add_btns = document.querySelectorAll(".add");
let cart = document.querySelector(".cart-items");
let quantities = document.querySelectorAll(".quantity");

// Initialize cart items
let cartItems = {};

// Function to update cart display
function updateCartDisplay() {
    cart.innerHTML = '<h2>Cart</h2>'; // Reset cart display
    let totalPrice = 0;
    let hasItems = false;

    // Loop through each product to display in cart
    for (const product of products) {
        const quantity = cartItems[product.id] ? cartItems[product.id].quantity : 0;
        if (quantity > 0) {
            hasItems = true;
            const itemTotal = quantity * product.price;
            totalPrice += itemTotal;

            // Create a new div for each item
            const itemDiv = document.createElement("div");
            itemDiv.style.backgroundColor = "rgb(168, 167, 167)";
            itemDiv.style.padding = "10px";
            itemDiv.style.width = "95%";
            itemDiv.style.color = "white";
            itemDiv.innerText = `${product.name} =>  ${quantity}x${itemTotal}`;
            cart.appendChild(itemDiv);
        }
    }

    // Display total price
    const totalDiv = document.createElement("div");
    totalDiv.innerText = `Total Price: $${totalPrice}`;
    totalDiv.style.backgroundColor = "grey";
    totalDiv.style.padding = "10px";
    totalDiv.style.width = "95%";
    totalDiv.style.color = "white";
    cart.appendChild(totalDiv);

    // If no items in cart, show message
    if (!hasItems) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "No Product added to the cart";
        cart.appendChild(emptyMessage);
    }
}

// Code for adding items to the cart
for (let i = 0; i < add_btns.length; i++) {
    add_btns[i].addEventListener("click", function () {
        const productId = products[i].id;

        // Add or update the quantity in the cart
        if (!cartItems[productId]) {
            cartItems[productId] = { quantity: 0 };
        }
        cartItems[productId].quantity++;

        // Update displayed quantity
        quantities[i].innerText = cartItems[productId].quantity;

        // Update cart display
        updateCartDisplay();
    });
}

// Code for removing items from the cart
for (let i = 0; i < remove_btns.length; i++) {
    remove_btns[i].addEventListener("click", function () {
        const productId = products[i].id;

        // Check if the product is in the cart
        if (!cartItems[productId] || cartItems[productId].quantity === 0) {
            alert("No Product added to the cart");
            return;
        }

        // Decrement the quantity
        cartItems[productId].quantity--;

        // Update displayed quantity
        quantities[i].innerText = cartItems[productId].quantity;

        // If quantity reaches zero, remove from cartItems
        if (cartItems[productId].quantity === 0) {
            delete cartItems[productId];
        }

        // Update cart display
        updateCartDisplay();
    });
}
