// Daftar produk yang tersedia
const products = [
    { id: 1, name: 'Produk A', price: 5000 },
    { id: 2, name: 'Produk B', price: 10000 },
    { id: 3, name: 'Produk C', price: 15000 },
    { id: 4, name: 'Produk D', price: 20000 }
];

let cart = [];

// Fungsi untuk memperbarui daftar produk
function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the list first

    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${product.name} - Rp ${product.price.toLocaleString()}
            <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Tambah</button>
        `;
        productList.appendChild(li);
    });
}

// Fungsi untuk memperbarui keranjang belanja
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    cartList.innerHTML = ''; // Clear the cart list

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} - Rp ${item.price.toLocaleString()}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Hapus</button>
        `;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.innerText = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!cart.find(item => item.id === productId)) {
        cart.push(product);
        updateCart();
    } else {
        alert('Produk sudah ada di keranjang!');
    }
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Fungsi untuk melakukan pembayaran
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang kosong, silakan tambahkan produk!');
    } else {
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Pembayaran berhasil! Total: Rp ${totalPrice.toLocaleString()}`);
        cart = [];
        updateCart();
    }
}

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Inisialisasi aplikasi
updateProductList();
