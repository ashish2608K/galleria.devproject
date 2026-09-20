// ---------------- DEMO PRODUCT DATA ----------------
const products = [
  {
    id: "green-outer", name: "Japan Green Outer", brand: "Uniqlo", category: "Jassen", price: 399, tag: "Best Seller", rating: 4.6, reviews: 38, img: "https://picsum.photos/seed/greenouter/700/840",
    desc: "Loose-fit outer jacket in a medium-weight cotton-blend fabric with a relaxed, roomy silhouette. Drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Soft, brushed inside."
  },
  {
    id: "black-basic-tee", name: "Black to Basic Tee", brand: "Nike", category: "T-Shirts", price: 150, tag: "", rating: 4.2, reviews: 21, img: "https://picsum.photos/seed/blacktee/700/840",
    desc: "A everyday essential tee cut from soft cotton jersey with a clean crew neck and a true-to-size regular fit. Pairs with almost anything in your rotation."
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
  {
    id: "brown-shirt", name: "Dreamy Brown Shirt", brand: "Uniqlo", category: "Overhemden", price: 250, tag: "", rating: 4.0, reviews: 11, img: "https://picsum.photos/seed/brownshirt/700/840",
    desc: "A soft, breathable button-up in warm brown, cut with a relaxed fit and a slightly boxy hem."
  },
  {
    id: "pink-outer", name: "Pink Outer", brand: "Zara", category: "Jassen", price: 220, tag: "", rating: 4.3, reviews: 9, img: "https://picsum.photos/seed/pinkouter/700/840",
    desc: "A statement outer layer in dusty pink with structured tailoring and a single-button close."
  },
  {
    id: "white-tee", name: "White Off Tee", brand: "Nike", category: "T-Shirts", price: 90, tag: "", rating: 4.5, reviews: 27, img: "https://picsum.photos/seed/whitetee1/700/840",
    desc: "A crisp off-white tee in breathable cotton, cut for a relaxed everyday fit."
  },
  {
    id: "white-tee-2", name: "White Off Tee 2.0", brand: "Vans", category: "T-Shirts", price: 95, tag: "", rating: 4.3, reviews: 16, img: "https://picsum.photos/seed/whitetee2/700/840",
    desc: "An updated take on the classic white tee with a slightly heavier fabric and reinforced seams."
  },
  {
    id: "dunk-high", name: "Dunk High Sneakers", brand: "Nike", category: "Sneakers", price: 180, tag: "Best Seller", rating: 4.9, reviews: 64, img: "https://picsum.photos/seed/dunkhigh/700/840",
    desc: "A retro-inspired high-top silhouette with a leather upper, padded collar, and a durable rubber outsole."
  },
  {
    id: "old-skool", name: "Old Skool Sneakers", brand: "Vans", category: "Sneakers", price: 120, tag: "", rating: 4.5, reviews: 31, img: "https://picsum.photos/seed/oldskool/700/840",
    desc: "The classic side-stripe skate shoe with a durable canvas and suede upper and signature waffle outsole."
  },
  {
    id: "trail-boots", name: "Trail Ridge Boots", brand: "Dickies", category: "Boots", price: 210, tag: "", rating: 4.4, reviews: 18, img: "https://picsum.photos/seed/trailboots/700/840",
    desc: "Rugged leather boots built for all-day wear, with a reinforced toe and a grippy lugged sole."
  },
  {
    id: "straight-broek", name: "Straight Fit Broek", brand: "Dickies", category: "Broeken", price: 130, tag: "", rating: 4.1, reviews: 13, img: "https://picsum.photos/seed/straightbroek/700/840",
    desc: "A straight-leg work pant in durable twill fabric with a comfortable, non-restrictive fit."
  },
  {
    id: "cargo-broek", name: "Everyday Cargo Broek", brand: "Uniqlo", category: "Broeken", price: 110, tag: "", rating: 4.2, reviews: 22, img: "https://picsum.photos/seed/cargobroek/700/840",
    desc: "A lightweight cargo pant with functional pockets and a tapered leg for everyday wear."
  },
  {
    id: "airpods-4", name: "Apple AirPods 4", brand: "Apple", category: "Electronics", price: 180, tag: "Best Seller", rating: 4.7, reviews: 145, img: "https://picsum.photos/seed/airpods4/700/840",
    desc: "Premium sound with smarter noise control and all-day comfort. Fast pairing, sweat and water resistant, and a compact charging case."
  },
  {
    id: "airpods-pro", name: "Apple AirPods Pro", brand: "Apple", category: "Electronics", price: 250, tag: "", rating: 4.8, reviews: 212, img: "https://picsum.photos/seed/airpodspro/700/840",
    desc: "Active noise cancellation, adaptive transparency, and personalized spatial audio in a comfortable in-ear design."
  },
  {
    id: "fossil-watch", name: "Fossil Gen Smart Watch", brand: "Fossil", category: "Accessories", price: 220, tag: "", rating: 4.3, reviews: 41, img: "https://picsum.photos/seed/fossilwatch/700/840",
    desc: "A hybrid smartwatch with heart-rate tracking, notifications, and a battery that lasts for days."
  },
  {
    id: "leather-watch", name: "Classic Leather Watch", brand: "Fossil", category: "Accessories", price: 160, tag: "", rating: 4.5, reviews: 29, img: "https://picsum.photos/seed/leatherwatch/700/840",
    desc: "A timeless analog watch with a genuine leather strap and a minimal, easy-to-read dial."
  },
  {
    id: "crewneck", name: "Knit Crewneck Sweater", brand: "Adidas", category: "Sweaters", price: 140, tag: "", rating: 4.2, reviews: 17, img: "https://picsum.photos/seed/crewneck/700/840",
    desc: "A classic knit crewneck in a mid-weight yarn, layers well over a tee or under a jacket."
  },
  {
    id: "denim-jassen", name: "Denim Jassen Jacket", brand: "Vans", category: "Jassen", price: 175, tag: "", rating: 4.4, reviews: 23, img: "https://picsum.photos/seed/denimjassen/700/840",
    desc: "A washed denim jacket with a classic collar, button front, and chest pockets."
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