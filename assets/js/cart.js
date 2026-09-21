/* cart.js
   Shared cart storage, used by product-detail.html and checkout.html.
   Cart is a simple array of { id, qty } saved to localStorage, so it
   survives navigating between pages on this static site. */

const CART_STORAGE_KEY = "galleria_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("cart.js: couldn't read cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn("cart.js: couldn't save cart to localStorage", e);
  }
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  return cart;
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
  return cart;
}

function clearCart() {
  saveCart([]);
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}