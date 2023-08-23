document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartList = document.querySelector(".cart");

    // Load cart data from session storage
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Display cart items
    function displayCart() {
        cartList.innerHTML = "";
        cartData.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${item.product}</span>
                <span>$${item.price}</span>
                <button class="remove-from-cart" data-product="${item.product}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
    }

    // Add product to cart
    function addToCart(product, price) {
        cartData.push({ product, price });
        sessionStorage.setItem("cart", JSON.stringify(cartData));
        displayCart();
    }

    // Remove product from cart
    function removeFromCart(product) {
        const index = cartData.findIndex(item => item.product === product);
        if (index !== -1) {
            cartData.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cartData));
            displayCart();
        }
    }

    // Event listeners
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.getAttribute("data-product");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(product, price);
        });
    });

    cartList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const product = event.target.getAttribute("data-product");
            removeFromCart(product);
        }
    });

    // Initial cart display
    displayCart();
});
