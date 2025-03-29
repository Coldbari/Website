let storedTotal = 0;
let shipping_Cost = 0;
let discount = 0;

document.addEventListener('DOMContentLoaded', function () {
    updateCart();
});

function updateCart() {
    let shoppingcart = JSON.parse(localStorage.getItem('shoppingcart')) || [];
    let checkoutList = document.getElementById('checkout-list');
    let checkoutTotal = document.getElementById('checkout-total');
    let checkoutsubtotal = document.getElementsByClassName('sub-total');
    let totalitemscart = document.getElementById('total-item-cart');
    let totalcostprice = document.getElementById('total-cost-price');

    totalitemscart.innerHTML = `Item ${shoppingcart.length}`;

    if (shoppingcart.length === 0) {
        checkoutList.innerHTML = '<p>Your cart is empty.</p>';
        checkoutTotal.innerHTML = 'Rs 0.00';
        checkoutsubtotal[0].innerHTML = 'Rs 0.00';

        // Check if reload has already happened
        if (!sessionStorage.getItem("cartReloaded")) {
            sessionStorage.setItem("cartReloaded", "true");
            setTimeout(() => {
                location.reload();
            }, 100); // Slight delay to ensure updates
        }
        // return;
    } else {
        // Reset flag if cart is not empty
        sessionStorage.removeItem("cartReloaded");
    }


    let subtotal = 0;
    checkoutList.innerHTML = '';

    shoppingcart.forEach((item, index) => {
        // Ensure each item has a unique id
        if (!item.id) {
            item.id = index + 1;
        }
        let itemElement = document.createElement('div');
        itemElement.classList.add('checkout-item');
        itemElement.innerHTML = `
           <div class="product-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="product-name">
                    <h6>${item.name}</h6>
                </div>
                <div class="quantity-control">
                    <button onclick="updateQuan(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuan(${item.id}, 1)">+</button>
                </div>
                <p class="price">${item.price.toFixed(2)}</p>
                <div class="total">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="remove-item">
                <button onclick="removeItem(${item.id})" class="remove-btn"><i class="fas fa-trash"></i> </button>
            </div>
        `;
        checkoutList.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    localStorage.setItem('shoppingcart', JSON.stringify(shoppingcart));

    storedTotal = subtotal;
    checkoutTotal.innerHTML = `Rs ${storedTotal.toFixed(2)}`;
    checkoutsubtotal[0].innerHTML = `Rs ${storedTotal.toFixed(2)}`;

    localStorage.setItem("Sub-total", storedTotal.toFixed(2));

    let total_price_payment = parseFloat(localStorage.getItem("Sub-total"));


    updateTotalCost();
}

function shippingCost() {
    let select = document.getElementById('selected-value');
    shipping_Cost = parseInt(select.value) || 0;
    document.getElementById('shipping-cost-price').innerHTML = `Rs ${shipping_Cost}`;

    console.log(shipping_Cost);

    updateTotalCost();
}

function applycode() {
    let promoCodeInput = document.getElementById('promo-code-input').value.trim();
    let promoCodePrice = document.getElementById('promo-code-price');

    if (promoCodeInput === '#get10') {
        discount = (storedTotal * 0.10).toFixed(2);
    } else if (promoCodeInput === '#get20') {
        discount = (storedTotal * 0.20).toFixed(2);
    } else {
        discount = 0;
    }

    promoCodePrice.innerHTML = `Rs -${discount}`;

    console.log(discount);
    updateTotalCost();
}

function updateTotalCost() {
    let totalcost = document.getElementById('total-cost-price');
    let finalDiscount = parseFloat(discount) || 0;
    let newTotal = (storedTotal - finalDiscount + shipping_Cost).toFixed(2);

    totalcost.innerHTML = `Rs ${newTotal}`;


    let paymentData = {
        subtotal: storedTotal.toFixed(2),
        shipping: shipping_Cost.toFixed(2),
        finalDiscount: finalDiscount.toFixed(2),
        total: newTotal
    };

    localStorage.setItem("total-price-payment", JSON.stringify(paymentData));

    console.log("Stored in Local Storage:", paymentData);

    console.log(newTotal);
}

function removeItem(itemId) {
    let shoppingcart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

    let index = shoppingcart.findIndex(i => i.id === itemId);

    if (index !== -1) {
        shoppingcart.splice(index, 1);
    }
    localStorage.setItem('shoppingcart', JSON.stringify(shoppingcart));
    updateCart();
}

function updateQuan(itemId, change) {
    let shoppingcart = JSON.parse(localStorage.getItem('shoppingcart')) || [];

    itemId = Number(itemId);
    let index = shoppingcart.findIndex(item => Number(item.id) === itemId);

    if (index !== -1) {
        shoppingcart[index].quantity += change;
        if (shoppingcart[index].quantity <= 0) {
            shoppingcart.splice(index, 1);
        }
    }
    localStorage.setItem('shoppingcart', JSON.stringify(shoppingcart));
    updateCart();
}


