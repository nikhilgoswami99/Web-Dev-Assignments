const products = [
  {
    id: 1,
    name: "Product-1",
    price: 100,
  },
  {
    id: 2,
    name: "Product-2",
    price: 200,
  },
  {
    id: 3,
    name: "Product-3",
    price: 300,
  },
];

let remove_btns = document.querySelectorAll(".remove");
let add_btns = document.querySelectorAll(".add");
let cart = document.querySelector(".cart-items");
let quantities = document.querySelectorAll(".quantity");
let cart_divs = cart.children;
console.log(cart_divs);

// code for adding items in the cart

for (let i = 0; i < add_btns.length; i++) {
  if (i === 0) {
    let div = document.createElement("div");
    let quantity_1 = 0;
    add_btns[i].addEventListener("click", function () {
      quantity_1++;
      quantities[0].innerText = quantity_1;
      div.innerText = products[0].name + " " + quantity_1;
    });
    cart.appendChild(div);
  } else if (i === 1) {
    let div = document.createElement("div");
    let quantity_1 = 0;
    add_btns[i].addEventListener("click", function () {
      quantity_1++;
      quantities[1].innerText = quantity_1;
      div.innerText = products[1].name + " " + quantity_1;
    });
    cart.appendChild(div);
  } else if (i === 2) {
    let div = document.createElement("div");
    let quantity_1 = 0;
    add_btns[i].addEventListener("click", function () {
      quantity_1++;
      quantities[2].innerText = quantity_1;
      div.innerText = products[2].name + " " + quantity_1;
    });
    cart.appendChild(div);
  }
}

// code for removing items from the cart

for (let i = 0; i < remove_btns.length; i++) {
  if (i == 0) {
    remove_btns[i].addEventListener("click", function () {
      let quantity = parseInt(quantities[i].innerText);
      if (quantity === 0) {
        alert("No Product added to the cart");
        return;
      } else if (quantity > 0) {
        quantity--;
        quantities[i].innerText = quantity;
        cart_divs[1].innerText;

        // Check if quantity has reached zero after the decrement
        if (quantity === 0) {
          cart_divs[1].remove();
        }
      }
    });
  } else if (i == 1) {
    remove_btns[i].addEventListener("click", function () {
      if (parseInt(quantities[i].innerText) === 0) {
        alert("No Product added to the cart");
        return;
      }
    });
  } else {
    remove_btns[i].addEventListener("click", function () {
      if (parseInt(quantities[i].innerText) === 0) {
        alert("No Product added to the cart");
        return;
      }
    });
  }
}
