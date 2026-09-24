(function () {
  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.warn("checkout.js: couldn't find the global `products` array from products-listing.js.");
    return;
  }
  if (typeof getCart === "undefined") {
    console.warn("checkout.js: cart.js must be loaded before checkout.js.");
    return;
  }

  const cartItemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotalValue");
  const shippingEl = document.getElementById("shippingValue");
  const taxEl = document.getElementById("taxValue");
  const totalEl = document.getElementById("totalValue");
  const continueBtn = document.getElementById("continueBtn");

  function field(p, ...names) {
    for (const n of names) if (p[n] !== undefined) return p[n];
    return "";
  }

  function getSelectedShippingCost() {
    const checked = document.querySelector('input[name="shippingMethod"]:checked');
    return checked ? Number(checked.value) : 0;
  }

  function renderCart() {
    const cart = getCart();

    if (!cart.length) {
      cartItemsEl.innerHTML = `<div class="cart-empty">Your cart is empty. <a href="products-listing.html">Browse products →</a></div>`;
      updateTotals(0);
      if (continueBtn) continueBtn.disabled = true;
      return;
    }
    if (continueBtn) continueBtn.disabled = false;

    let subtotal = 0;

    cartItemsEl.innerHTML = cart.map(item => {
      const p = products.find(pr => field(pr, "id", "slug") === item.id);
      if (!p) return "";
      const name = field(p, "name", "title");
      const img = field(p, "img", "image", "thumbnail");
      const category = field(p, "category");
      const price = Number(field(p, "price"));
      const lineTotal = price * item.qty;
      subtotal += lineTotal;

      return `
        <div class="cart-item" data-id="${item.id}">
        <div class="img-box">
          <div class="thumb">
              <img src="${img}" alt="${name}">
          </div>
           <span class="qty-badge">${item.qty}</span>
        </div>
          <div class="info">
            <p class="name">${name}</p>
            <p class="meta">${category}</p>
            <div class="qty-controls">
              <button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="remove">Remove</button>
          </div>
          <div class="price">$${lineTotal.toFixed(2)}</div>
        </div>`;
    }).join("");

    // Wire up per-item controls
    cartItemsEl.querySelectorAll(".cart-item").forEach(row => {
      const id = row.dataset.id;
      const item = cart.find(i => i.id === id);

      row.querySelector(".qty-plus").addEventListener("click", () => {
        updateCartQty(id, item.qty + 1);
        renderCart();
      });
      row.querySelector(".qty-minus").addEventListener("click", () => {
        if (item.qty <= 1) return;
        updateCartQty(id, item.qty - 1);
        renderCart();
      });
      row.querySelector(".remove").addEventListener("click", () => {
        removeFromCart(id);
        renderCart();
      });
    });

    updateTotals(subtotal);
  }

  function updateTotals(subtotal) {
    const shipping = subtotal > 0 ? getSelectedShippingCost() : 0;
    const tax = subtotal > 0 ? subtotal * 0.02 : 0; // simple placeholder estimate
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".shipping-method").forEach(el => el.classList.remove("active"));
      radio.closest(".shipping-method").classList.add("active");
      renderCart();
    });
  });

  const applyDiscountBtn = document.getElementById("applyDiscount");
  if (applyDiscountBtn) {
    applyDiscountBtn.addEventListener("click", () => {
      const code = document.getElementById("discountCode").value.trim();
      if (!code) return;
      alert(`Demo only — no real discount codes are wired up yet. You entered: "${code}"`);
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const form = document.getElementById("shippingForm");
      if (form && !form.reportValidity()) return;

      const cart = getCart();
      if (!cart.length) return;

      alert("Demo only — this is where you'd move to a real payment step.");
      // Example of what a real flow might do next:
      // clearCart();
      // window.location.href = "payment.html";
    });
  }

  renderCart();
})();