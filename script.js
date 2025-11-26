// ---------------- PRODUCT DATA ----------------
const products = [
    { id: 1, name: "iPhone 14", price: 68999, img: "https://images.unsplash.com/photo-1661956600466-57bb84c1a324?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Samsung S23", price: 54999, img: "https://images.unsplash.com/photo-1610945415295-d9f6bb88870a?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "OnePlus 11", price: 48999, img: "https://images.unsplash.com/photo-1616348436168-de43ad642a55?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Redmi Note 13", price: 15999, img: "https://images.unsplash.com/photo-1585060544812-6b45742a3a80?auto=format&fit=crop&w=800&q=80" }
];

// ---------------- LOAD PRODUCTS ----------------
function loadProducts() {
    const box = document.getElementById("product-list");
    if (!box) return;

    box.innerHTML = "";
    products.forEach(p => {
        box.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}
loadProducts();

// ---------------- CART SYSTEM ----------------
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(id) {
    const cart = getCart();
    const item = products.find(p => p.id === id);
    cart.push(item);
    saveCart(cart);
    alert("Added to cart!");
}

// ---------------- DISPLAY CART ----------------
function loadCart() {
    const container = document.getElementById("cart-container");
    if (!container) return;

    const cart = getCart();
    let total = 0;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <button class="btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    container.innerHTML += `<h2>Total: ₹${total}</h2>`;
}
loadCart();

// Remove item
function removeItem(i) {
    const cart = getCart();
    cart.splice(i, 1);
    saveCart(cart);
    loadCart();
}

// ---------------- SEARCH ----------------
document.getElementById("searchBox")?.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));

    const box = document.getElementById("product-list");
    box.innerHTML = "";

    filtered.forEach(p => {
        box.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
});
