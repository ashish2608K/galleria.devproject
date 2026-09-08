// ---------------- DEMO PRODUCT DATA ----------------
const products = [
    { name: "Apple AirPods 4", brand: "Apple", category: "Electronics", price: 180, tag: "Best Seller", img: "https://picsum.photos/seed/airpods4/500/560" },
    { name: "Apple AirPods Pro", brand: "Apple", category: "Electronics", price: 250, tag: "", img: "https://picsum.photos/seed/airpodspro/500/560" },
    { name: "Fossil Gen Smart Watch", brand: "Fossil", category: "Accessories", price: 220, tag: "", img: "https://picsum.photos/seed/fossilwatch/500/560" },
    { name: "Classic Leather Watch", brand: "Fossil", category: "Accessories", price: 160, tag: "", img: "https://picsum.photos/seed/leatherwatch/500/560" },
    { name: "Knit Crewneck Sweater", brand: "Adidas", category: "Sweaters", price: 140, tag: "", img: "https://picsum.photos/seed/crewneck/500/560" },
    { name: "Denim Jassen Jacket", brand: "Vans", category: "Jassen", price: 175, tag: "", img: "https://picsum.photos/seed/denimjassen/500/560" },
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

// ---------------- KEYWORD (FUZZY-LITE) SEARCH ----------------
// Matches if every typed keyword appears anywhere inside the product's
// combined name/brand/category text — so "airpods" finds "Apple AirPods 4",
// "watch" finds anything with "watch" in the name, etc. No exact match needed.
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
                <a href="#" class="buy_now_btn">Buy Now</a>
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

document.getElementById('searchInput').addEventListener('input', (e) => {
    state.search = e.target.value;
    render();
});

document.getElementById('resetFilters').addEventListener('click', () => {
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

buildFilterOptions();
render();