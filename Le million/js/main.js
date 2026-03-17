// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ============ HAMBURGER ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
}

// ============ SEARCH ============
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchToggle) searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput.focus();
});
if (searchClose) searchClose.addEventListener('click', () => searchBar.classList.remove('open'));
if (searchInput) searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) window.location.href = `collections.html?search=${encodeURIComponent(q)}`;
  }
});

// ============ CART EVENTS ============
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

// ============ MODAL ============
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !modalBody) return;
  modalBody.innerHTML = `
    <div class="modal-img">${product.emoji}</div>
    <div class="modal-info">
      <p class="modal-cat">${product.category}</p>
      <h2 class="modal-name">${product.name}</h2>
      <p class="modal-price">${product.price}</p>
      <p class="modal-desc">${product.desc}</p>
      <button class="btn btn-primary modal-add" onclick="addToCart(${product.id}); closeModal();">Add to Selection</button>
    </div>
  `;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// ============ RENDER PRODUCT CARD ============
function renderCard(product) {
  return `
    <div class="product-card" id="product-${product.id}" onclick="openModal(${product.id})">
      <div class="product-img-wrap">
        <span>${product.emoji}</span>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" title="Quick Add" onclick="event.stopPropagation(); addToCart(${product.id})">＋</button>
          <button class="product-action-btn" title="View Details" onclick="event.stopPropagation(); openModal(${product.id})">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <h3 class="product-name">${product.name}</h3>
          <span class="product-price">${product.price}</span>
        </div>
        <p class="product-cat">${product.category}</p>
      </div>
    </div>
  `;
}

// ============ HOMEPAGE FEATURED ============
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid) {
  const featured = products.filter(p => p.badge).slice(0, 4);
  featuredGrid.innerHTML = featured.map(renderCard).join('');
}

// ============ ANIMATE ON SCROLL ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .cat-card, .team-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
