// ---------------- DEMO PRODUCT DATA ----------------
const products = [
  {
    id: "green-outer", name: "Japan Green Outer", brand: "Uniqlo", category: "Jassen", price: 399, tag: "Best Seller", rating: 4.6, reviews: 38, img: "https://picsum.photos/seed/greenouter/700/840",
    desc: "Loose-fit outer jacket in a medium-weight cotton-blend fabric with a relaxed, roomy silhouette. Drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Soft, brushed inside."
  },
  {
    id: "black-basic-tee", name: "Black to Basic Tee", brand: "Nike", category: "T-Shirts", price: 150, tag: "", rating: 4.2, reviews: 21, img: "https://picsum.photos/seed/blacktee/700/840",
    desc: "desPremium Sound. Smarter Noise Control. All-Day Comfort.Experience an immersive listening experience with  Buds Pro (2nd generation) engineered to deliver rich, detailed audio while giving you greater control over the sounds around you. Powered by the Shop Galleria Buds Pro 2 combines powerful  Noise Cancellation, Adaptive Transparency, Personalised Spatial Audio and intuitive touch controls in a compact, comfortable design. "
  },
  {
    id: "soft-hoodie", name: "Soft Hoodie", brand: "Adidas", category: "Sweaters", price: 250, tag: "", rating: 4.8, reviews: 52, img: "https://picsum.photos/seed/softhoodie/700/840",
    desc: "Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined, drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket."
  },
  {
    id: "white-off-jacket", name: "White Off Jacket 2024", brand: "Zara", category: "Jassen", price: 150, tag: "", rating: 4.1, reviews: 14, img: "https://picsum.photos/seed/whiteoff/700/840",
    desc: "Lightweight off-white jacket with a quilted finish and a relaxed fit, built for transitional weather layering."
  },
  {
    id: "lawyer-suit", name: "One Set Lawyer Suit", brand: "Zara", category: "Overhemden", price: 150, tag: "", rating: 4.4, reviews: 19, img: "https://picsum.photos/seed/lawyersuit/700/840",
    desc: "A tailored two-piece set with a structured shoulder and a clean, minimal silhouette suited for the office or a night out."
  },

];

const state = { search: "", brands: new Set(), categories: new Set(), maxPrice: 500 };

// ---------------- BUILD FILTER OPTIONS ----------------
function buildFilterOptions() {
  const brandCounts = {};
  const categoryCounts = {};
  products.forEach(p => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const brandBox = document.getElementById('brandFilters');
  brandBox.innerHTML = Object.keys(brandCounts).sort().map(b => `
      <label class="filter-row">
        <span class="left"><input type="checkbox" class="brand-check" value="${b}"> ${b}</span>
        <span class="count">${brandCounts[b]}</span>
      </label>`).join('');

  const catBox = document.getElementById('categoryFilters');
  catBox.innerHTML = Object.keys(categoryCounts).sort().map(c => `
      <label class="filter-row">
        <span class="left"><input type="checkbox" class="cat-check" value="${c}"> ${c}</span>
        <span class="count">${categoryCounts[c]}</span>
      </label>`).join('');

  document.querySelectorAll('.brand-check').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.checked ? state.brands.add(cb.value) : state.brands.delete(cb.value);
      render();
    });
  });
  document.querySelectorAll('.cat-check').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.checked ? state.categories.add(cb.value) : state.categories.delete(cb.value);
      render();
    });
  });

  const maxPossible = Math.max(...products.map(p => p.price));
  const priceRange = document.getElementById('priceRange');
  priceRange.max = maxPossible;
  priceRange.value = maxPossible;
  state.maxPrice = maxPossible;
  document.getElementById('priceValue').textContent = maxPossible;
  priceRange.addEventListener('input', () => {
    state.maxPrice = Number(priceRange.value);
    document.getElementById('priceValue').textContent = state.maxPrice;
    render();
  });
}

function matchesSearch(product, query) {
  if (!query) return true;
  const haystack = (product.name + ' ' + product.brand + ' ' + product.category).toLowerCase();
  const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
  return keywords.every(k => haystack.includes(k));
}

function getFiltered() {
  return products.filter(p => {
    const okSearch = matchesSearch(p, state.search);
    const okBrand = state.brands.size === 0 || state.brands.has(p.brand);
    const okCat = state.categories.size === 0 || state.categories.has(p.category);
    const okPrice = p.price <= state.maxPrice;
    return okSearch && okBrand && okCat && okPrice;
  });
}

function cardHTML(p) {
  return `
      <div class="product_item_cards">
        <div class="product_bg">
          <div class="img_wrap">
            ${p.tag ? `<span class="product_title">${p.tag}</span>` : ``}
            <span class="like_btn">♡</span>
            <img src="${p.img}" alt="${p.name}">
          </div>
          <div class="content_area">
            <p class="brand">${p.brand}</p>
            <h2 class="heading">${p.name}</h2>
            <div class="cnt_wrap">
              <p>$${p.price}</p>
              <div class="product_button">
                <a href="product-detail.html?id=${p.id}" class="buy_now_btn">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}

function render() {
  const filtered = getFiltered();
  const grid = document.getElementById('productGrid');
  grid.innerHTML = filtered.length
    ? filtered.map(cardHTML).join('')
    : `<div class="no-results">No products match your search and filters. Try clearing a filter.</div>`;
  document.getElementById('resultCount').textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    state.search = e.target.value;
    render();
  });
}

const resetBtn = document.getElementById('resetFilters');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    state.search = "";
    state.brands.clear();
    state.categories.clear();
    document.getElementById('searchInput').value = "";
    document.querySelectorAll('.brand-check, .cat-check').forEach(cb => cb.checked = false);
    const priceRange = document.getElementById('priceRange');
    priceRange.value = priceRange.max;
    state.maxPrice = Number(priceRange.max);
    document.getElementById('priceValue').textContent = state.maxPrice;
    render();
  });
}

if (document.getElementById('productGrid')) {
  buildFilterOptions();
  render();
}

buildFilterOptions();
render();