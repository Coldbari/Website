fetch('/html/navbar.html')
  .then(response => response.text())
  .then(text => {
    document.getElementById('navbar').innerHTML = text;
  }
  );

fetch('/html/footer.html')
  .then(response => response.text())
  .then(text => {
    document.getElementById('footer').innerHTML = text;
  }
  );

fetch('/html/features.html')
  .then(response => response.text())
  .then(text => {
    document.getElementById('features').innerHTML = text;
  }
  );

function closeCart() {
  document.getElementById('card-container').style.display = 'none';
}

function opencart() {
  document.getElementById('card-container').style.display = 'block';
}



document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn");

  // If not logged in, redirect to login page
  if (loggedIn !== "true") {
    window.location.replace("login.html");  // ✅ Uses replace() instead of href
  }
});


window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, "", window.location.href);
};



let cart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

function addtocart(image, name, price) {
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      image: image,
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCartDisplay();
  opencart();
  localStorage.setItem('shoppingcart', JSON.stringify(cart)); // Save to localStorage
}

function updateCartDisplay() {
  let cartItemsContainer = document.getElementById('cart-product');
  let totalElement = document.getElementById('total');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Cart is empty</p>';
    totalElement.innerHTML = 'Total: Rs 0';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    let itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="cart-item-container">
          <img id="cart-item-image" src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">Rs ${item.price}</span>
              <div class="quantity-control">
                  <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>    
              </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">🗑</button>
      </div>`;
    cartItemsContainer.appendChild(itemElement);
  });

  totalElement.innerHTML = `Total: Rs ${total}`;
  localStorage.setItem('shoppingcart', JSON.stringify(cart)); // Save cart state
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('shoppingcart', JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('shoppingcart', JSON.stringify(cart));
  updateCartDisplay();
}

let checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function () {
    localStorage.setItem('shoppingcart', JSON.stringify(cart));
    window.location.href = '/html/checkout.html';
  });
}

updateCartDisplay();

function register() {
  window.location.href = '/html/login.html';
}

function openproductfeature(image, backimage , side1image , side2image , side3image , name, price) {
  let cartship = JSON.parse(localStorage.getItem('product-description')) || [];

  cartship = [{ image, backimage , side1image , side2image , side3image, name , price }]; // Always replace with the new product

  localStorage.setItem('product-description', JSON.stringify(cartship));

  // Redirect to product features page
  window.location.href = "/html/product-features.html";
}
