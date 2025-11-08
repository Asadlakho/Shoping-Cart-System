
    let products = [
      { id: 1, name: "Watch", price: 100000, img: "watch.jpg" },
      { id: 2, name: "Shoes", price: 80000, img: "shoes.jpg" },
      { id: 3, name: "Headphones", price: 120000, img: "headphones.jpg" },
      { id: 4, name: "Bags", price: 90000, img: "bag.jpg" }
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function showProducts() {
      let out = "";
      products.forEach(p => {
        out += `
          <div class="border rounded-xl p-4 bg-gray-50 hover:shadow-lg transition">
            <img src="${p.img}" class="w-full h-40 object-cover rounded-lg mb-3">
            <h3 class="font-semibold text-lg">${p.name}</h3>
            <p class="text-gray-600 mb-2">Rs. ${p.price}</p>
            <button onclick="addToCart(${p.id})" class="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">Add to Cart</button>
          </div>`;
      });
      document.getElementById("products").innerHTML = out;
    }

    function showCart() {
      let out = "";
      let total = 0;
      let count = 0;
      cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        out += `
          <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <p>${item.name}</p>
            <div class="flex items-center space-x-2">
              <button onclick="changeQty(${item.id}, -1)" class="bg-gray-300 px-2 rounded">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)" class="bg-gray-300 px-2 rounded">+</button>
            </div>
            <p class="font-semibold">Rs.${item.price * item.qty}</p>
            <button onclick="removeItem(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Remove</button>
          </div>`;
      });
      document.getElementById("cart").innerHTML = out || "<p class='text-gray-500'>Cart is empty</p>";
      document.getElementById("total").textContent = total;
      document.getElementById("cart-count").textContent = count;
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(id) {
      let item = products.find(p => p.id === id);
      let found = cart.find(p => p.id === id);
      if (found) {
        found.qty++;
      } else {
        cart.push({ ...item, qty: 1 });
      }
      showCart();
    }

    function changeQty(id, num) {
      let item = cart.find(p => p.id === id);
      if (!item) return;
      item.qty += num;
      if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
      showCart();
    }

    function removeItem(id) {
      cart = cart.filter(p => p.id !== id);
      showCart();
    }

    document.getElementById("checkout").addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("Thank you for your purchase!");
      cart = [];
      localStorage.removeItem("cart");
      showCart();
    });

    showProducts();
    showCart();