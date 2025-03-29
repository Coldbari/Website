// Fetch reusable components
['navbar', 'footer', 'features'].forEach(component => {
    fetch(`/html/${component}.html`)
        .then(response => response.text())
        .then(text => document.getElementById(component).innerHTML = text);
});

function closeCart() {
    document.getElementById('card-container').style.display = 'none';
}

function opencart() {
    document.getElementById('card-container').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    updateProductFeatures();
    updateCartDisplay(); // Ensure cart updates on page load
});

// Retrieve cart data from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

function updateProductFeatures() {
    let product_description = JSON.parse(localStorage.getItem('product-description')) || [];

    // Ensure product_description is an array
    if (!Array.isArray(product_description)) {
        product_description = [product_description];
    }

    let product_container = document.getElementById('product-container');
    product_container.innerHTML = ''; // Clear previous items

    product_description.forEach((item, index) => {
        if (!item.id) {
            item.id = index + 1;
        }

        let itemElement = document.createElement('div');
        itemElement.classList.add('product-description-item');

        itemElement.innerHTML = `
        <div class="product-info">
            <div class="image-section">
             <div class="image-box">
                    <div class="boxer-image">
                    <img src="${item.image}" alt="image" onclick="changeimage(this)"/>
                    </div>
                    <div class="boxer-image">
                    <img src="${item.backimage}" alt="image" onclick="changeimage(this)"/>
                    </div>
                    <div class="boxer-image">
                    <img src="${item.side1image}" alt="image" onclick="changeimage(this)"/>
                    </div>
                    <div class="boxer-image">
                    <img src="${item.side2image}" alt="image" onclick="changeimage(this)"/>
                    </div>
                    <div class="boxer-image">
                    <img src="${item.side3image}" alt="image" onclick="changeimage(this)"/>
                    </div>
                </div>
                <img src="${item.image || 'default.jpg'}" alt="${item.name}" id="main-image">
            </div>
            <div class="product-description">
                <div class="product-name">
                    <h6>${item.name}</h6>
                </div>
                <div class="product-item-paragraphy">
                    <p>${item.paragraph || "Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptatibus, pariatur voluptate illum reiciendis veritatis accusamus eveniet cum aliquid nemo maxime ea.Alias, quasi ? Nihil, non, cupiditate qui libero quos corporis vel necessitatibus itaque quo dolor dicta! Qui aliquid unde, labore impedit omnis, dolore rerum dolorem tempore odio assumenda, quasi eos."}</p>
                </div >
                <div class="product-rating">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span>(${item.rating || 15080})</span>      
                </div>
                <div class="product-price">
                    <p>₹ ${item.price}</p>
                </div>
                <div class="quantity-item-control">
                    <button onclick="updateQuan(${index}, -1)">-</button>
                    <span class="quantity-item" id="quantity">${item.quantity || 1}</span>
                    <button onclick="updateQuan(${index}, 1)">+</button> 
                </div>
                <h5>Hurry up! Only 4 item left
                <div class="productbtn">
                    <button onclick="addToCart(${index})">Add to Cart</button>
                </div>
                <br>
                <span id="sharelink" onclick="share()">Share<i class="fa-solid fa-share"></i></span>

                <div class="list-features">
                <h3>Key features :</h3>
                   <ul>
                       <li>Pen writes permanently.</li>  
                       <li>Pencil is erasable.</li>  
                       <li>Book gives knowledge.</li>  
                       <li>Pens have various inks.</li>  
                       <li>Pencils suit sketching.</li>  
                       <li>Books are digital too.</li>  
                       <li>All aid learning.</li>  
                   </ul>
                </div>
                 <!-- Product Specifications -->
                <div class="product-specs">
                    <h3>Product Specifications :</h3>
                    <ul>
                        <li><strong>Material:</strong> High-quality plastic & metal</li>
                        <li><strong>Dimensions:</strong> 15cm x 5cm x 2cm</li>
                        <li><strong>Weight:</strong> 200g</li>
                        <li><strong>Ink Type:</strong> Water-resistant</li>
                        <li><strong>Page Quality:</strong> 80 GSM</li>
                    </ul>
                </div>

                <!-- Shipping & Returns -->
                <div class="shipping-returns">
                    <h3>Shipping & Returns :</h3>
                    <p>✅ Free delivery on orders above ₹500.</p>
                    <p>✅ Returns accepted within 10 days of delivery.</p>
                    <p>✅ Secure packaging ensures product safety during transit.</p>
                </div>

            </div >
        </div >
            `;

        product_container.appendChild(itemElement);
    });
}

// Function to update product quantity
function updateQuan(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
        updateCartDisplay();
    }
}


function share() {
    let productShare = window.location.href;
    navigator.clipboard.writeText(productShare);
}


// Function to add product to cart
function addToCart(index) {
    let product_description = JSON.parse(localStorage.getItem('product-description')) || [];

    if (!Array.isArray(product_description)) {
        product_description = [product_description];
    }

    let product = product_description[index];

    if (!product.id) {
        product.id = index + 1; // Assign a unique ID if missing
    }

    // Check if the item is already in the cart
    let existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('shoppingcart', JSON.stringify(cart));

    // Update cart UI
    updateCartDisplay();
    opencart();
}


// Function to update the cart display
function updateCartDisplay() {
    let cartItemsContainer = document.getElementById('cart-product');
    let totalElement = document.getElementById('total');

    if (!cart || cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Cart is empty</p>';
        totalElement.innerHTML = 'Total: ₹ 0';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
                <div div class="cart-item-container">
                    <img id="cart-item-image" src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">₹ ${item.price}</span>
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

    totalElement.innerHTML = `Total: ₹ ${total} `;
    localStorage.setItem('shoppingcart', JSON.stringify(cart)); // Save cart state
}

// Function to update cart item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

let checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
        window.location.href = '/html/checkout.html';
    });
}


// Redirect to register/login page
function register() {
    window.location.href = '/html/login.html';
}

// import { updateCartDisplay } from './index.js';




function changeimage(thumbnail) {
    let main_image = document.getElementById("main-image");

    main_image.src = thumbnail.src;
}