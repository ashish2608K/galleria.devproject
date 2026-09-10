(function () {
    if (typeof products === "undefined" || !Array.isArray(products)) {
        console.warn(
            "product-detail.js: couldn't find a global `products` array. " +
            "Make sure assets/js/products.js is loaded before this file, " +
            "and that it defines `const products = [...]`."
        );
        return;
    }

    // Small helper so this keeps working even if your field names differ slightly.
    function field(p, ...names) {
        for (const n of names) if (p[n] !== undefined) return p[n];
        return "";
    }

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");
    const product =
        products.find(p => String(field(p, "id", "slug")) === requestedId) ||
        products[0];

    if (!product) return;

    const id = field(product, "id", "slug");
    const name = field(product, "name", "title");
    const price = field(product, "price");
    const category = field(product, "category");
    const img = field(product, "img", "image", "thumbnail");
    const desc = field(product, "desc", "description");
    const tag = field(product, "tag", "badge");
    const rating = Number(field(product, "rating")) || 4.5;
    const reviews = field(product, "reviews") || 0;

    // ---------------- GALLERY ----------------
    document.getElementById("mainImage").src = img;
    document.getElementById("mainImage").alt = name;

    // Build simple thumbnail variations from the same image if you don't
    // have a multi-image field yet — swap this for product.images if you add one.
    const thumbs = field(product, "images") && Array.isArray(product.images) && product.images.length
        ? product.images
        : [img, img, img];

    document.getElementById("thumbs").innerHTML = thumbs.map((src, i) => `
    <button class="${i === 0 ? "active" : ""}" data-src="${src}">
      <img src="${src}" alt="${name} view ${i + 1}">
    </button>`).join("");

    document.querySelectorAll("#thumbs button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("mainImage").src = btn.dataset.src;
            document.querySelectorAll("#thumbs button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // ---------------- INFO ----------------
    document.getElementById("badge").textContent = category || "Product";
    document.getElementById("title").textContent = name;
    document.getElementById("price").textContent = `$${Number(price).toFixed(2)}`;
    document.getElementById("desc").textContent = desc || "No description available yet.";
    document.getElementById("ratingNum").textContent = rating.toFixed(1);
    document.getElementById("ratingSub").textContent = `(${reviews} New Reviews)`;
    document.title = `${name} — Galleria`;

    // ---------------- SIZES ----------------
    const sizeList = ["S", "M", "L", "XL", "XXL"];
    document.getElementById("sizes").innerHTML = sizeList.map((s, i) => `
    <button class="${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>`).join("");

    document.querySelectorAll("#sizes button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("#sizes button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // ---------------- ACTIONS (demo only — wire to your real cart logic) ----------------
    document.getElementById("addToCart").addEventListener("click", () => {
        alert(`Added "${name}" to cart.`);
    });
    document.getElementById("wishBtn").addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        e.target.textContent = e.target.classList.contains("active") ? "♥" : "♡";
    });

    // ---------------- RELATED PRODUCTS ----------------
    function relatedCardHTML(p) {
        const pId = field(p, "id", "slug");
        const pName = field(p, "name", "title");
        const pImg = field(p, "img", "image", "thumbnail");
        const pPrice = field(p, "price");
        const pCategory = field(p, "category");
        return `
      <div class="pdp-related-card">
        <div class="pdp-related-img"><img src="${pImg}" alt="${pName}"></div>
        <p class="pdp-related-name">${pName}</p>
        <p class="pdp-related-meta">${pCategory} · $${Number(pPrice).toFixed(0)}</p>
        <a class="pdp-related-link" href="product-detail.html?id=${pId}">View product</a>
      </div>`;
    }

    const related = products.filter(p => field(p, "id", "slug") !== id).slice(0, 4);
    document.getElementById("relatedGrid").innerHTML = related.map(relatedCardHTML).join("");
})();