document.addEventListener("DOMContentLoaded", function () {
    let payment = JSON.parse(localStorage.getItem("total-price-payment"));

    if (payment) {
        let Sub_total = document.getElementById("subtotal");
        let Shipping = document.getElementById("shipping");
        let Discount = document.getElementById("discount");
        let Total = document.getElementById("total");

        Sub_total.innerHTML = `Rs ${payment.subtotal}`;
        Shipping.innerHTML = `Rs ${payment.shipping}`;
        Discount.innerHTML = `- Rs ${payment.finalDiscount}`;
        Total.innerHTML = `Rs ${payment.total}`;
    }
    updateCart();
});


function updateCart() {
    let shoppingcart = JSON.parse(localStorage.getItem("shoppingcart")) || [];
    let checkoutList = document.getElementById('product-div');
    checkoutList.innerHTML = "";

    shoppingcart.forEach((item, index) => {
        if (!item.id) item.id = index + 1; // Ensure each item has a unique ID

        let price = parseFloat(item.price) || 0; // 🔧 Fix: Ensure price is a valid number
        let totalItemPrice = (price * item.quantity).toFixed(2);

        let itemElement = document.createElement("div");
        itemElement.classList.add("checkout-item");
        itemElement.innerHTML = `
           <div class="product-info">
                <img src="${item.image}" alt="${item.name}">
                <div class="product-name">
                    <h6>${item.name}</h6>
                </div>
                <p class="price">Rs ${price.toFixed(2)}</p>
            </div>
        `;
        checkoutList.appendChild(itemElement);
    });
    updateTotalCost();
}

document.getElementById("card-number").addEventListener("input", function (event) {
    let input = event.target.value.replace(/\D/g, "");
    let formattedInput = input.match(/.{1,4}/g)?.join(" ") || input;
    event.target.value = formattedInput;
});


document.getElementById("pin-input").addEventListener("input", function (event) {
    this.value = this.value.replace(/\D/g, "");
});

function changepayment() {
    let card = document.getElementById("card");
    let info = document.getElementById("info");
    let gpay = document.getElementById("card-payment-gpay");

    gpay.style.display = "none";
    card.style.display = "none";
    info.style.display = "block";
}

function backchange() {
    let card = document.getElementById("card");
    let info = document.getElementById("info");
    let gpay = document.getElementById("card-payment-gpay");

    gpay.style.display = "none";
    card.style.display = "flex";
    info.style.display = "none";
}

function paymentbygpay() {
    let card = document.getElementById("card");
    let info = document.getElementById("info");
    let gpay = document.getElementById("card-payment-gpay");

    card.style.display = "none";
    info.style.display = "none";
    gpay.style.display = "block";
}


function verify() {
    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let name = document.getElementById("name-user");

    if (firstname.trim() !== "" && lastname.trim() !== "") {
        name.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${firstname} ${lastname}`;
    } else {
        alert("Please enter your name")
    }

}


function nextpage() {
    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let add1 = document.getElementById("address").value;
    let add2 = document.getElementById("address2").value;
    let phonenumber = document.getElementById("phone").value;

    let address = add1 + " " +add2;
    let fullname = firstname + " " + lastname;
    
    localStorage.setItem("name", fullname);
    localStorage.setItem("address" , address );
    localStorage.setItem("phone" , phonenumber);

    window.location.href = "/html/order-confirmed.html";
}


