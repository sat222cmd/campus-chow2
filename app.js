// ── DATA ──
const MENU = [
  { id:1,  name:'Waakye Special',        price:35, cat:'mains',  emoji:'🍛', badge:'best',  badgeTxt:'Bestseller', rating:4.9, rev:312, desc:'Rice & beans with spaghetti, egg, fried plantain and rich tomato stew.' },
  { id:2,  name:'Jollof Plate',          price:38, cat:'mains',  emoji:'🍲', badge:'hot',   badgeTxt:'Popular',    rating:4.8, rev:287, desc:'Smoky Ghanaian Jollof with grilled chicken and a fresh side salad.' },
  { id:3,  name:'Banku & Tilapia',       price:55, cat:'mains',  emoji:'🐟', badge:'hot',   badgeTxt:'Popular',    rating:4.9, rev:421, desc:'Grilled whole tilapia with smooth fermented banku and spicy pepper sauce.' },
  { id:4,  name:'Fufu & Light Soup',     price:45, cat:'mains',  emoji:'🍜', badge:'hot',   badgeTxt:'Popular',    rating:4.9, rev:334, desc:'Hand-pounded fufu in aromatic light soup with chicken or goat meat.' },
  { id:5,  name:'Kontomire + Ampesi',    price:30, cat:'mains',  emoji:'🥬', badge:null,    badgeTxt:null,         rating:4.5, rev:112, desc:'Boiled plantain & cocoyam with creamy kontomire stew. Wholesome.' },
  { id:6,  name:'Fried Rice & Chicken',  price:42, cat:'mains',  emoji:'🍗', badge:'best',  badgeTxt:'Bestseller', rating:4.8, rev:256, desc:'Wok-style fried rice loaded with veg, egg and crispy fried chicken.' },
  { id:7,  name:'Tom Brown Porridge',    price:20, cat:'mains',  emoji:'🥣', badge:'new',   badgeTxt:'Breakfast',  rating:4.6, rev:129, desc:'Warm roasted corn porridge with sugar and milk. Ultimate cosy breakfast.' },
  { id:8,  name:'Kelewele & Beans',      price:28, cat:'snacks', emoji:'🍌', badge:'spicy', badgeTxt:'Spicy',      rating:4.6, rev:198, desc:'Spiced fried ripe plantain with creamy black-eyed beans.' },
  { id:9,  name:'Egg Sandwich',          price:18, cat:'snacks', emoji:'🥪', badge:'new',   badgeTxt:'Quick',      rating:4.4, rev:93,  desc:'Toasted bread with scrambled eggs, tomatoes, onions and chilli sauce.' },
  { id:10, name:'Meat Pie',              price:15, cat:'snacks', emoji:'🥧', badge:'new',   badgeTxt:'Quick',      rating:4.5, rev:180, desc:'Flaky golden pastry filled with savoury minced beef. Perfect study snack.' },
  { id:11, name:'Puff Puff (6 pcs)',     price:12, cat:'snacks', emoji:'🍩', badge:null,    badgeTxt:null,         rating:4.6, rev:210, desc:'Pillowy deep-fried dough dusted in sugar. Impossible to eat just one.' },
  { id:12, name:'Sobolo (Large)',        price:12, cat:'drinks', emoji:'🥤', badge:'new',   badgeTxt:'New',        rating:4.7, rev:145, desc:'Ice-cold hibiscus flower drink with ginger, cloves and mint.' },
  { id:13, name:'Coconut Water',         price:10, cat:'drinks', emoji:'🥥', badge:null,    badgeTxt:null,         rating:4.8, rev:77,  desc:'Fresh chilled coconut water. Naturally hydrating between lectures.' },
  { id:14, name:'Malta Drink',           price:10, cat:'drinks', emoji:'🍺', badge:null,    badgeTxt:null,         rating:4.4, rev:88,  desc:'Rich dark malt drink — non-alcoholic, energising, packed with B vitamins.' },
  { id:15, name:'Fresh Orange Juice',    price:15, cat:'drinks', emoji:'🍊', badge:'new',   badgeTxt:'New',        rating:4.7, rev:64,  desc:'Freshly squeezed, chilled and pulpy. Perfect for exam season.' },
  { id:16, name:'Extra Plantain',        price:8,  cat:'extras', emoji:'🍟', badge:null,    badgeTxt:null,         rating:4.7, rev:55,  desc:'A generous side of golden fried ripe plantain. Add it to anything.' },
  { id:17, name:'Boiled Eggs (x2)',      price:8,  cat:'extras', emoji:'🥚', badge:null,    badgeTxt:null,         rating:4.3, rev:42,  desc:'Two perfectly boiled eggs, lightly seasoned. Protein-rich add-on.' },
  { id:18, name:'Shito Hot Sauce',       price:6,  cat:'extras', emoji:'🌶', badge:'spicy', badgeTxt:'Spicy',      rating:4.9, rev:301, desc:'Premium black pepper sauce with dried fish, shrimp & scotch bonnets.' },
];

const FEATURED_IDS = [1, 2, 3];

// ── STATE ──
const cart = {};
let activeFilter = 'all';
let drawerOpen = false;

// ── REFS ──
const $cartToggle    = document.getElementById('cartToggle');
const $cartNum       = document.getElementById('cartNum');
const $overlay       = document.getElementById('overlay');
const $drawer        = document.getElementById('drawer');
const $drawerClose   = document.getElementById('drawerClose');
const $drawerItems   = document.getElementById('drawerItems');
const $drawerEmpty   = document.getElementById('drawerEmpty');
const $drawerFoot    = document.getElementById('drawerFoot');
const $drawerSub     = document.getElementById('drawerSub');
const $subtotalVal   = document.getElementById('subtotalVal');
const $totalVal      = document.getElementById('totalVal');
const $locInput      = document.getElementById('locInput');
const $locErr        = document.getElementById('locErr');
const $waBtn         = document.getElementById('waBtn');
const $foodGrid      = document.getElementById('foodGrid');
const $filterRow     = document.getElementById('filterRow');
const $menuCountLbl  = document.getElementById('menuCountLbl');
const $featuredItems = document.getElementById('featuredItems');
const $toast         = document.getElementById('toast');

// ── BADGE MAP ──
const BADGE_CLASS = { hot:'badge-hot', new:'badge-new', best:'badge-best', spicy:'badge-spicy' };

// ── RENDER FEATURED ──
function renderFeatured() {
  $featuredItems.innerHTML = '';
  FEATURED_IDS.forEach(id => {
    const item = MENU.find(m => m.id === id);
    if (!item) return;
    const el = document.createElement('div');
    el.className = 'feat-item';
    el.innerHTML = `
      <div class="feat-emoji">${item.emoji}</div>
      <div class="feat-info">
        <span class="feat-name">${item.name}</span>
        <span class="feat-price">GHS ${item.price}</span>
      </div>
      <button class="feat-add" data-id="${item.id}" aria-label="Add ${item.name}">+</button>
    `;
    $featuredItems.appendChild(el);
  });
}

// ── RENDER MENU GRID ──
function renderGrid(filter = 'all') {
  const list = filter === 'all' ? MENU : MENU.filter(m => m.cat === filter);
  $menuCountLbl.textContent = `${list.length} item${list.length !== 1 ? 's' : ''}`;
  $foodGrid.innerHTML = '';
  list.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-emoji-wrap">${item.emoji}</div>
        <div class="card-badges">
          ${item.badge ? `<span class="badge ${BADGE_CLASS[item.badge]}">${item.badgeTxt}</span>` : ''}
        </div>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-foot">
          <div>
            <div class="card-price"><sup>GHS </sup>${item.price}</div>
            <div class="card-rating"><span class="s">★</span> ${item.rating} (${item.rev})</div>
          </div>
          <button class="add-to-cart" data-id="${item.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add
          </button>
        </div>
      </div>
    `;
    $foodGrid.appendChild(card);
    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 45);
  });
}

// ── ADD TO CART ──
function addItem(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  cart[id] ? cart[id].qty++ : (cart[id] = { ...item, qty: 1 });
  refreshCart();
  showToast(`${item.emoji} ${item.name} added`);
}

// ── CART MATH ──
function totalItems() { return Object.values(cart).reduce((s, i) => s + i.qty, 0); }
function subtotal()   { return Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0); }

// ── REFRESH CART UI ──
function refreshCart() {
  const n   = totalItems();
  const sub = subtotal();

  $cartNum.textContent = n;
  $cartNum.classList.add('bounce');
  setTimeout(() => $cartNum.classList.remove('bounce'), 350);

  $drawerSub.textContent = n === 0
    ? 'Nothing added yet'
    : `${n} item${n !== 1 ? 's' : ''} in your order`;

  $subtotalVal.textContent = sub.toFixed(2);
  $totalVal.textContent    = (sub + 6).toFixed(2);

  $drawerEmpty.style.display = n === 0 ? 'flex'  : 'none';
  $drawerFoot.style.display  = n === 0 ? 'none'  : 'block';

  document.querySelectorAll('.d-item').forEach(el => el.remove());
  Object.values(cart).forEach(item => {
    const el = document.createElement('div');
    el.className = 'd-item';
    el.innerHTML = `
      <div class="d-item-emoji">${item.emoji}</div>
      <div class="d-item-info">
        <div class="d-item-name">${item.name}</div>
        <div class="d-item-price">GHS ${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="qty-ctrl">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
      </div>
      <button class="d-remove" data-action="remove" data-id="${item.id}" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    `;
    $drawerItems.insertBefore(el, $drawerEmpty);
  });
}

// ── DRAWER ITEM ACTIONS ──
$drawerItems.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id     = +btn.dataset.id;
  const action = btn.dataset.action;
  if      (action === 'inc')    { cart[id].qty++; }
  else if (action === 'dec')    { cart[id].qty--; if (cart[id].qty <= 0) delete cart[id]; }
  else if (action === 'remove') { delete cart[id]; }
  refreshCart();
});

// ── GRID ADD ──
$foodGrid.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;
  addItem(+btn.dataset.id);
  btn.textContent = '✓ Added';
  btn.style.background = '#2D5016';
  setTimeout(() => {
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`;
    btn.style.background = '';
  }, 1200);
});

// ── FEATURED ADD ──
$featuredItems.addEventListener('click', e => {
  const btn = e.target.closest('.feat-add');
  if (!btn) return;
  addItem(+btn.dataset.id);
  btn.textContent = '✓';
  btn.style.background = '#2D5016';
  setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 1200);
});

// ── FILTER ──
$filterRow.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  activeFilter = chip.dataset.f;
  renderGrid(activeFilter);
});

// ── DRAWER OPEN / CLOSE ──
function openDrawer()  {
  drawerOpen = true;
  $drawer.classList.add('open');
  $overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawerOpen = false;
  $drawer.classList.remove('open');
  $overlay.classList.remove('open');
  document.body.style.overflow = '';
}

$cartToggle.addEventListener('click', () => drawerOpen ? closeDrawer() : openDrawer());
$drawerClose.addEventListener('click', closeDrawer);
$overlay.addEventListener('click', closeDrawer);

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  $toast.textContent = msg;
  $toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $toast.classList.remove('show'), 2000);
}

// ── CHECKOUT ──
$waBtn.addEventListener('click', () => {
  const loc = $locInput.value.trim();
  if (!loc) {
    $locInput.classList.add('err');
    $locErr.classList.add('show');
    $locInput.focus();
    setTimeout(() => {
      $locInput.classList.remove('err');
      $locErr.classList.remove('show');
    }, 3000);
    return;
  }
  $locInput.classList.remove('err');
  $locErr.classList.remove('show');

  const items = Object.values(cart);
  const sub   = subtotal();
  const total = sub + 6;

  let msg = `🍛 *CAMPUS CHOW — NEW ORDER*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `*ORDER ITEMS:*\n`;
  items.forEach(it => {
    msg += `• ${it.name} x${it.qty} — GHS ${(it.price * it.qty).toFixed(2)}\n`;
  });
  msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Subtotal:      GHS ${sub.toFixed(2)}\n`;
  msg += `Delivery fee:  GHS 6.00\n`;
  msg += `*TOTAL:        GHS ${total.toFixed(2)}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `📍 *Delivery Location:*\n${loc}\n\n`;
  msg += `_Sent via Campus Chow_ 🍛`;

  window.open(`https://wa.me/233204147897?text=${encodeURIComponent(msg)}`, '_blank');
});

$locInput.addEventListener('input', () => {
  if ($locInput.value.trim()) {
    $locInput.classList.remove('err');
    $locErr.classList.remove('show');
  }
});

// ── PARTNER — VENDOR ──
document.getElementById('vendorBtn').addEventListener('click', () => {
  const msg =
    `👋 *Hi Campus Chow!*\n\n` +
    `I'd like to *partner as a Food Vendor* 🍳\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Please send me details on:\n` +
    `• How to list my food on Campus Chow\n` +
    `• Commission / revenue split\n` +
    `• How orders will be sent to me\n` +
    `• How to get started\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `_Sent via Campus Chow Partner Page_`;
  window.open(`https://wa.me/233204147897?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── PARTNER — RIDER ──
document.getElementById('riderBtn').addEventListener('click', () => {
  const msg =
    `👋 *Hi Campus Chow!*\n\n` +
    `I'd like to *join as a Delivery Rider* 🏍️\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Please send me details on:\n` +
    `• How much I can earn per delivery\n` +
    `• How delivery hours work\n` +
    `• What areas I'd cover\n` +
    `• How to get started\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `_Sent via Campus Chow Partner Page_`;
  window.open(`https://wa.me/233204147897?text=${encodeURIComponent(msg)}`, '_blank');
});

// ── INIT ──
renderFeatured();
renderGrid();
refreshCart();

// ── PARTNER BUTTONS ──
document.querySelectorAll('.pcard-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;

    let msg = '';
    if (type === 'vendor') {
      msg =
        `👋 Hi Campus Chow!\n\n` +
        `I'd like to *partner as a Food Vendor.*\n\n` +
        `Here are my details:\n` +
        `• Business/Food Name: \n` +
        `• What I sell: \n` +
        `• My location on campus: \n` +
        `• Contact number: \n\n` +
        `Please let me know the next steps. Thank you! 🍛`;
    } else {
      msg =
        `👋 Hi Campus Chow!\n\n` +
        `I'd like to *join as a Delivery Rider.*\n\n` +
        `Here are my details:\n` +
        `• Full name: \n` +
        `• Student or non-student: \n` +
        `• Transport (bike/bicycle/on foot): \n` +
        `• Availability (hours/days): \n` +
        `• Contact number: \n\n` +
        `Looking forward to hearing from you! 🛵`;
    }

    window.open(
      `https://wa.me/233201198700?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  });
});
