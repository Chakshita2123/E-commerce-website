const sampleProducts = [
  {
    id: 1,
    name: "Midnight Rose",
    price: 899,
    image: "midnight rose.webp",
    description: "Rich Rose | Midnight Vibes",
    rating: 4.5,
    reviews: 6
  },
  {
    id: 2,
    name: "Scottish Mist",
    price: 999,
    image: "scottish mist.webp",
    description: "Fresh Lavender | Cold Breeze",
    rating: 5,
    reviews: 9
  },
  {
    id: 3,
    name: "Citrus Bloom",
    price: 849,
    image: "citrus bloom.jpeg",
    description: "Zesty Citrus | Fresh Bloom",
    rating: 4,
    reviews: 2
  }
];

function getStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = '';

  for (let i = 0; i < fullStars; i++) stars += '★';
  if (halfStar) stars += '☆'; // you can replace with half star emoji/icon
  while (stars.length < 5) stars += '☆';

  return `<span class="stars">${stars}</span>`;
}

if (document.getElementById("hero-products")) {
  const container = document.getElementById("hero-products");
  sampleProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="description">${p.description}</p>
        <div class="rating">
            ${getStars(p.rating)} 
            <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
        </div>
        <p class="price">FROM ₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

const bestsellersPage = [
  { id: 1, name: "Midnight Rose", price: 899, image: "midnight rose.webp", description: "Rich Rose | Midnight Vibes", rating: 4.5, reviews: 6 },
  { id: 2, name: "Scottish Mist", price: 999, image: "scottish mist.webp", description: "Fresh Lavender | Cold Breeze", rating: 5, reviews: 9 },
  { id: 3, name: "Citrus Bloom", price: 849, image: "citrus bloom.jpeg", description: "Zesty Citrus | Fresh Bloom", rating: 4, reviews: 2 },
  { id: 4, name: "Vanilla Amber", price: 1050, image: "vanilla amber.webp", description: "Warm Vanilla | Amber Touch", rating: 0, reviews: 0 },
  { id: 5, name: "Lavender Noir", price: 999, image: "lavender noir.jpeg", description: "Lavender & Musk", rating: 4.2, reviews: 5 },
  { id: 6, name: "Rose Luxe", price: 1150, image: "rose luxe.jpeg", description: "Damask Rose & Oud", rating: 4.9, reviews: 8 },
  { id: 7, name: "Candlelight Bloom", price: 950, image: "candlelight bloom.jpeg", description: "Cherry Blossom & Cedar", rating: 4.3, reviews: 3 },
  { id: 8, name: "Velvet Amber", price: 1099, image: "velvet amber.jpeg", description: "Amber & Tonka", rating: 5, reviews: 7 }
];

if (document.getElementById("bestseller-page-products")) {
  const container = document.getElementById("bestseller-page-products");
  bestsellersPage.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}



const floralOnly = [
  {
    id: 101,
    name: "Bloom Garden",
    price: 899,
    image: "bloom garden.jpeg",
    description: "Jasmine & Peony",
    rating: 4.5,
    reviews: 10
  },
  {
    id: 102,
    name: "Petal Kiss",
    price: 949,
    image: "petal kiss.webp",
    description: "Rose & Freesia",
    rating: 5,
    reviews: 6
  },
  {
    id: 103,
    name: "Morning Blossom",
    price: 899,
    image: "morning blossom.jpeg",
    description: "Lily & Bergamot",
    rating: 4,
    reviews: 4
  },
  {
    id: 104,
    name: "Fresh Flora",
    price: 999,
    image: "fresh flora.jpeg",
    description: "Orchid & Green Tea",
    rating: 4.8,
    reviews: 8
  },
  {
    id: 105,
    name: "Blush Dew",
    price: 975,
    image: "blush dew.webp",
    description: "Tuberose & Dew Drops",
    rating: 4.3,
    reviews: 5
  },
  {
    id: 106,
    name: "Floral Whisper",
    price: 1020,
    image: "floral whisper.jpeg",
    description: "Magnolia & White Tea",
    rating: 4.7,
    reviews: 7
  }
];

if (document.getElementById("floral-page-products")) {
  const container = document.getElementById("floral-page-products");
  floralOnly.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


const woodyOnly = [
  {
    id: 301,
    name: "Cedar Calm",
    price: 1050,
    image: "cedar calm.webp",
    description: "Cedarwood & Musk",
    rating: 5,
    reviews: 11
  },
  {
    id: 302,
    name: "Sandal Soul",
    price: 1025,
    image: "sandal soul.png",
    description: "Sandalwood & Amber",
    rating: 4.6,
    reviews: 7
  },
  {
    id: 303,
    name: "Earth Elixir",
    price: 985,
    image: "earth ellixir.jpg",
    description: "Patchouli & Oak",
    rating: 4.2,
    reviews: 5
  },
  {
    id: 304,
    name: "Woodland Trail",
    price: 999,
    image: "wooden trail.jpeg",
    description: "Vetiver & Balsam",
    rating: 4.7,
    reviews: 9
  },
  {
    id: 305,
    name: "Rustic Charm",
    price: 1075,
    image: "rustic charm.webp",
    description: "Pinewood & Leather",
    rating: 4.4,
    reviews: 6
  },
  {
    id: 306,
    name: "Misty Forest",
    price: 990,
    image: "misty forest.jpg",
    description: "Rainwood & Moss",
    rating: 4.8,
    reviews: 8
  }
];
if (document.getElementById("woody-page-products")) {
  const container = document.getElementById("woody-page-products");
  woodyOnly.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


const opulentOnly = [
  {
    id: 401,
    name: "Gold Musk",
    price: 1100,
    image: "gold musk.jpeg",
    description: "White Musk & Vanilla",
    rating: 5,
    reviews: 14
  },
  {
    id: 402,
    name: "Velvet Spice",
    price: 1125,
    image: "velvet spice.jpeg",
    description: "Spice & Incense",
    rating: 4.9,
    reviews: 13
  },
  {
    id: 403,
    name: "Oud Royale",
    price: 1199,
    image: "oud royale.jpeg",
    description: "Oud & Clove",
    rating: 5,
    reviews: 10
  },
  {
    id: 404,
    name: "Amber Luxe",
    price: 1150,
    image: "amber luxe.jpeg",
    description: "Amber & Leather",
    rating: 4.6,
    reviews: 12
  },
  {
    id: 405,
    name: "Royal Ember",
    price: 1200,
    image: "royal ember.jpeg",
    description: "Saffron & Resin",
    rating: 4.8,
    reviews: 9
  },
  {
    id: 406,
    name: "Orient Bloom",
    price: 1175,
    image: "orient bloom.webp",
    description: "Oud & Rose",
    rating: 4.7,
    reviews: 11
  }
];

if (document.getElementById("opulent-page-products")) {
  const container = document.getElementById("opulent-page-products");
  opulentOnly.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

const shopAllProducts = [
  { id: 1, name: "Midnight Rose", price: 899, image: "midnight rose.webp", description: "Rich Rose | Midnight Vibes", rating: 4.5, reviews: 6 },
  { id: 2, name: "Scottish Mist", price: 999, image: "scottish mist.webp", description: "Fresh Lavender | Cold Breeze", rating: 5, reviews: 9 },
  { id: 3, name: "Citrus Bloom", price: 849, image: "citrus bloom.jpeg", description: "Zesty Citrus | Fresh Bloom", rating: 4, reviews: 2 },
  { id: 4, name: "Vanilla Amber", price: 1050, image: "vanilla amber.webp", description: "Warm Vanilla | Amber Touch", rating: 0, reviews: 0 },
  { id: 5, name: "Bloom Garden", price: 899, image: "bloom garden.jpeg", description: "Jasmine & Peony", rating: 4.5, reviews: 10 },
  { id: 6, name: "Petal Kiss", price: 949, image: "petal kiss.webp", description: "Rose & Freesia", rating: 5, reviews: 6 },
  { id: 7, name: "Cedar Calm", price: 1050, image: "cedar calm.webp", description: "Cedarwood & Musk", rating: 5, reviews: 11 },
  { id: 8, name: "Gold Musk", price: 1100, image: "gold musk.jpeg", description: "White Musk & Vanilla", rating: 5, reviews: 14 },
  { id: 9, name: "Velvet Spice", price: 1125, image: "velvet spice.jpeg", description: "Spice & Incense", rating: 4.9, reviews: 13 },
  { id: 10, name: "Morning Blossom", price: 899, image: "morning blossom.jpeg", description: "Lily & Bergamot", rating: 4, reviews: 4 },
  { id: 11, name: "Fresh Flora", price: 999, image: "fresh flora.jpeg", description: "Orchid & Green Tea", rating: 4.8, reviews: 8 },
  { id: 12, name: "Amber Luxe", price: 1150, image: "amber luxe.jpeg", description: "Amber & Leather", rating: 4.6, reviews: 12 },
  {
  id: 13,
  name: "Amber Nights",
  price: 1099,
  image: "amber nights.jpeg",
  description: "Warm Amber | Cozy Evenings",
  rating: 4.7,
  reviews: 11
},
{
  id: 14,
  name: "Peony Luxe",
  price: 999,
  image: "peony luxe.jpeg",
  description: "Peony Bloom | Spring Fresh",
  rating: 4.5,
  reviews: 6
},
{
  id: 15,
  name: "Oud Whisper",
  price: 1299,
  image: "oud whisper.webp",
  description: "Oud & Resin | Earthy Woods",
  rating: 4.9,
  reviews: 9
},
{
  id: 16,
  name: "Blushed Fig",
  price: 899,
  image: "blush fug.jpeg",
  description: "Sweet Fig | Subtle Floral",
  rating: 4.3,
  reviews: 7
}
];

if (document.getElementById("shopall-products")) {
  const container = document.getElementById("shopall-products");
  shopAllProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


const accessoriesProducts = [
  {
    id: 1,
    name: "Wick Trimmer",
    price: 399,
    image: "wick trimmer.webp",
    description: "Keep your candle clean",
    rating: 4.6,
    reviews: 12
  },
  {
    id: 2,
    name: "Candle Snuffer",
    price: 349,
    image: "candle snuffer.webp",
    description: "Elegant snuffing tool",
    rating: 4.8,
    reviews: 9
  },
  {
    id: 3,
    name: "Candle Tray",
    price: 599,
    image: "candle tray.webp",
    description: "Marble base for jars",
    rating: 5,
    reviews: 7
  },
  {
    id: 4,
    name: "Gift Box Set",
    price: 999,
    image: "gift box.jpeg",
    description: "Luxury packaging",
    rating: 4.9,
    reviews: 15
  },
  {
    id: 5,
    name: "Lighter Wand",
    price: 299,
    image: "lighter wand.jpg",
    description: "Refillable gas wand",
    rating: 4.4,
    reviews: 5
  },
  {
    id: 6,
    name: "Glass Cloche",
    price: 899,
    image: "glass cloche.webp",
    description: "Dust-protective cover",
    rating: 4.7,
    reviews: 10
  },
  {
    id: 7,
    name: "Candle Coaster",
    price: 249,
    image: "candle coaster.jpeg",
    description: "Minimal ceramic base",
    rating: 4.3,
    reviews: 4
  },
  {
    id: 8,
    name: "Matchbox Set",
    price: 199,
    image: "matchbox set.jpeg",
    description: "Long luxury matches",
    rating: 4.6,
    reviews: 6
  }
];

if (document.getElementById("accessories-products")) {
  const container = document.getElementById("accessories-products");
  accessoriesProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


const giftingProducts = [
  { id: 701, name: "Festive Gift Box", price: 1499, image: "festive.jpg", description: "3 Candles + Accessories", rating: 4.8, reviews: 12 },
  { id: 702, name: "Luxury Duo Set", price: 1299, image: "luxury.jpeg", description: "2 Candles + Snuffer", rating: 5, reviews: 8 },
  { id: 703, name: "Mini Jar Trio", price: 999, image: "mini jar.webp", description: "3 Mini Fragrance Jars", rating: 4.6, reviews: 10 },
  { id: 704, name: "Spa Vibes Box", price: 1399, image: "spa vibes.jpeg", description: "Candle + Bath Set", rating: 4.7, reviews: 7 },
  { id: 705, name: "Warm Glow Pack", price: 1199, image: "warm.jpeg", description: "Amber Candle + Wick Trimmer", rating: 4.9, reviews: 6 },
  { id: 706, name: "Celebration Combo", price: 1599, image: "celebration.jpg", description: "Scented Candle Duo + Match Jar", rating: 5, reviews: 9 }
];

if (document.getElementById("gifting-products")) {
  const container = document.getElementById("gifting-products");
  giftingProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="description">${p.description}</p>
      <div class="rating">
        ${getStars(p.rating)}
        <span>${p.reviews > 0 ? `${p.reviews} REVIEWS` : 'NO REVIEWS'}</span>
      </div>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


// Sample products list (you can expand this)
const allProducts = [
  "Midnight Rose",
  "Scottish Mist",
  "Citrus Bloom",
  "Vanilla Amber",
  "Lavender Noir",
  "Rose Luxe",
  "Candlelight Bloom",
  "Velvet Amber",
  "Musk Ember",
  "Golden Oud",
  "Amber Woods",
  "Spiced Leather",
  "Royal Musk",
  "Noir Velvet"
];

function showSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionList = document.getElementById("suggestionList");

  suggestionList.innerHTML = "";

  if (!input) {
    suggestionList.style.display = "none";
    return;
  }

  const matches = allProducts.filter(product =>
    product.toLowerCase().includes(input)
  );

  if (matches.length === 0) {
    suggestionList.style.display = "none";
    return;
  }

  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match;
    li.onclick = () => {
      // Redirect to search.html with query
      window.location.href = `search.html?query=${encodeURIComponent(match)}`;
    };
    suggestionList.appendChild(li);
  });

  suggestionList.style.display = "block";
}

// Event listener
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", showSuggestions);
  }
});

// 🛒 Initialize or fetch cart from localStorage
let cart = JSON.parse(localStorage.getItem('lumera_cart')) || [];

// ✅ Add to Cart
function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem('lumera_cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// 🧮 Update cart icon count (optional if you have a cart icon with count)
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById('cart-count');
  if (cartIcon) cartIcon.textContent = count;
}

// 📦 Render Cart Items (for cart.html)
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: ₹${item.price}</p>
      <div class="quantity-controls">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </div>
      <p>Subtotal: ₹${subtotal}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalContainer.innerHTML = `<strong>Total: ₹${total}</strong>`;
}

// ➕➖ Quantity Controls
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('lumera_cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// ❌ Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('lumera_cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// 🗑️ Clear Cart
function clearCart() {
  cart = [];
  localStorage.setItem('lumera_cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// 🛒 Load Cart on page load
if (window.location.pathname.includes('cart.html')) {
  renderCart();
}
document.addEventListener("DOMContentLoaded", updateCartCount);

