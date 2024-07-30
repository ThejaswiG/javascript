document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ];

    const cart = [];

    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - $${product.price}
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(li);
        });
    };

    const renderCart = () => {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button onclick="removeFromCart(${item.id})">Remove</button>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="updateQuantity(${item.id}, -1)" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
            `;
            cartList.appendChild(li);
        });
        renderTotalPrice();
    };

    const renderTotalPrice = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    };

    window.removeFromCart = (productId) => {
        const cartIndex = cart.findIndex(item => item.id === productId);
        if (cartIndex > -1) {
            cart.splice(cartIndex, 1);
        }
        renderCart();
    };

    window.updateQuantity = (productId, amount) => {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += amount;
            if (cartItem.quantity <= 0) {
                removeFromCart(productId);
            } else {
                renderCart();
            }
        }
    };

    renderProducts();
    renderCart();
});