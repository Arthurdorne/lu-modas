/* ===================================
   LU MODAS – script.js
   =================================== */

const products = [
  { id:1,  name:"Vestido Midi Floral",     category:"vestidos",    desc:"Vestido midi com estampa floral delicada, perfeito para qualquer ocasião.", price:129.90, oldPrice:169.90, promo:true,  img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80" },
  { id:2,  name:"Vestido Viscolinho",       category:"vestidos",    desc:"Leveza e conforto em tecido viscolinho. Ideal para o dia a dia.",            price:139.90, oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1594938298603-c8148c4b7e94?w=500&q=80" },
  { id:3,  name:"Conjunto Alfaiataria",     category:"conjuntos",   desc:"Conjunto elegante de alfaiataria. Blazer + calça de alta qualidade.",        price:229.90, oldPrice:289.90, promo:true,  img:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80" },
  { id:4,  name:"Macaquinho Botões",        category:"macaquinhos", desc:"Macaquinho com botões frontais, elegante e confortável.",                     price:109.90, oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80" },
  { id:5,  name:"Blusa Ombro a Ombro",      category:"blusas",      desc:"Blusa ombro a ombro com acabamento premium. Versátil e feminina.",            price:69.90,  oldPrice:89.90,  promo:true,  img:"https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=500&q=80" },
  { id:6,  name:"Vestido Midi Preto",       category:"vestidos",    desc:"Clássico vestido midi preto. Um item essencial no guarda-roupa.",             price:119.90, oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1550639524-a199353c1729?w=500&q=80" },
  { id:7,  name:"Conjunto Linho Bege",      category:"conjuntos",   desc:"Conjunto em linho com camisa e short, perfeito para o verão.",               price:189.90, oldPrice:239.90, promo:true,  img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80" },
  { id:8,  name:"Blusa Croppada Listrada",  category:"blusas",      desc:"Blusa croppada com listras delicadas. Combine com calça ou saia.",            price:59.90,  oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" },
  { id:9,  name:"Vestido Rosa Botões",      category:"vestidos",    desc:"Vestido fluido na cor rosê com detalhes em botões. Super delicado!",          price:99.90,  oldPrice:129.90, promo:true,  img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80" },
  { id:10, name:"Macaquinho Liso",          category:"macaquinhos", desc:"Macaquinho liso de manga curta, versátil e estiloso.",                        price:89.90,  oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80" },
  { id:11, name:"Blusa Tule Floral",        category:"blusas",      desc:"Blusa em tule com bordado floral. Delicada e sofisticada.",                   price:79.90,  oldPrice:99.90,  promo:true,  img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80" },
  { id:12, name:"Vestido Branco Linho",     category:"vestidos",    desc:"Vestido branco em linho com cinto. Elegante e refrescante.",                  price:149.90, oldPrice:null,   promo:false, img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80" }
];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';

function fmt(v) { return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
const catLabel = { vestidos:'Vestidos', conjuntos:'Conjuntos', blusas:'Blusas', macaquinhos:'Macaquinhos' };

/* =========================================
   PRODUTOS
   ========================================= */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');

  const list = products.filter(p => {
    const matchFilter =
      currentFilter === 'all'   ? true :
      currentFilter === 'promo' ? p.promo :
      p.category === currentFilter;

    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      catLabel[p.category].toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });

  if (list.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.promo ? '<span class="badge-promo">Promoção</span>' : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${catLabel[p.category]}</span>
        <p class="product-name">${p.name}</p>
        <p class="product-desc">${p.desc}</p>
        <div class="product-prices">
          ${p.oldPrice ? `<span class="product-price-old">${fmt(p.oldPrice)}</span>` : ''}
          <span class="product-price">${fmt(p.price)}</span>
        </div>
        <button class="btn-add" data-id="${p.id}">
          <i class="fas fa-bag-shopping"></i> Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

/* Filtros */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

/* Busca */
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  searchClear.classList.toggle('show', searchQuery.length > 0);
  renderProducts();
});
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.remove('show');
  searchInput.focus();
  renderProducts();
});

/* Clique nos botões "Adicionar" — delegação no grid */
document.getElementById('productsGrid').addEventListener('click', e => {
  const btn = e.target.closest('.btn-add');
  if (!btn) return;
  const id = parseInt(btn.dataset.id);
  addToCart(id, btn);
});

/* =========================================
   CARRINHO — LÓGICA
   ========================================= */
function addToCart(id, btn) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  openCart();

  /* feedback visual no botão */
  const orig = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
  setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = orig; }, 1500);
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  else renderCart();
}

/* =========================================
   CARRINHO — RENDER
   Usa delegação de eventos: um único listener
   no container, nunca perde os botões.
   ========================================= */
const cartItemsEl  = document.getElementById('cartItems');
const cartEmptyEl  = document.getElementById('cartEmpty');
const cartFooterEl = document.getElementById('cartFooter');

/* Delegação: qualquer clique dentro de cartItemsEl */
cartItemsEl.addEventListener('click', e => {
  const inc = e.target.closest('[data-action="inc"]');
  const dec = e.target.closest('[data-action="dec"]');
  const rem = e.target.closest('[data-remove]');

  if (inc) changeQty(parseInt(inc.dataset.id), +1);
  if (dec) changeQty(parseInt(dec.dataset.id), -1);
  if (rem) removeItem(parseInt(rem.dataset.id));
});

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* badges */
  const cc = document.getElementById('cartCount');
  cc.textContent = count;
  cc.classList.toggle('show', count > 0);

  const cm = document.getElementById('cartCountMobile');
  cm.textContent = count;
  cm.classList.toggle('show', count > 0);

  if (cart.length === 0) {
    cartFooterEl.style.display = 'none';
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-bag-shopping"></i>
        <p>Seu carrinho está vazio</p>
        <a href="#produtos" class="btn-primary" id="goProducts">Ver Produtos</a>
      </div>`;
    document.getElementById('goProducts')?.addEventListener('click', closeCart);
    return;
  }

  cartFooterEl.style.display = 'block';
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy"/>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          <button class="cart-item-remove" data-remove data-id="${item.id}">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('cartTotal').textContent = fmt(total);
}

/* =========================================
   CARRINHO — ABRIR / FECHAR
   ========================================= */
function openCart()  {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartBtnMobile').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

/* =========================================
   MODAL CHECKOUT
   ========================================= */
function openModal() {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);

  document.getElementById('orderSummary').innerHTML = cart.map(i => `
    <div class="summary-item">
      <span>${i.name} x${i.qty}</span>
      <span>${fmt(i.price * i.qty)}</span>
    </div>
  `).join('');

  document.getElementById('modalTotal').textContent = fmt(total);
  document.getElementById('modalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('checkoutBtn').addEventListener('click', () => { closeCart(); setTimeout(openModal, 200); });
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

/* =========================================
   MOSTRAR/ESCONDER ENDEREÇO
   ========================================= */
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const fields = document.getElementById('addressFields');
    if (radio.value === 'entrega' && radio.checked) {
      fields.classList.add('show');
    } else {
      fields.classList.remove('show');
    }
  });
});

/* =========================================
   ENVIAR PEDIDO WHATSAPP
   ========================================= */
document.getElementById('sendWppBtn').addEventListener('click', () => {
  const name     = document.getElementById('clientName').value.trim();
  const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'retirada';
  const nameErr  = document.getElementById('nameError');

  // valida nome
  if (!name) { nameErr.classList.add('show'); document.getElementById('clientName').focus(); return; }
  nameErr.classList.remove('show');

  // valida endereço se entrega
  if (delivery === 'entrega') {
    const rua    = document.getElementById('addrRua').value.trim();
    const num    = document.getElementById('addrNum').value.trim();
    const bairro = document.getElementById('addrBairro').value.trim();
    let hasError = false;

    if (!rua)    { document.getElementById('addrRuaError').classList.add('show');    hasError = true; } else { document.getElementById('addrRuaError').classList.remove('show'); }
    if (!num)    { document.getElementById('addrNumError').classList.add('show');    hasError = true; } else { document.getElementById('addrNumError').classList.remove('show'); }
    if (!bairro) { document.getElementById('addrBairroError').classList.add('show'); hasError = true; } else { document.getElementById('addrBairroError').classList.remove('show'); }

    if (hasError) return;

    const comp = document.getElementById('addrComp').value.trim();
    const enderecoTexto = `${rua}, ${num}${comp ? ', ' + comp : ''} – ${bairro}, Eunápolis-BA`;

    enviarPedido(name, delivery, enderecoTexto);
  } else {
    enviarPedido(name, delivery, null);
  }
});

function enviarPedido(name, delivery, endereco) {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const lines = cart.map(i => `- ${i.name} x${i.qty}  ${fmt(i.price * i.qty)}`).join('\n');

  const entregaTexto = delivery === 'entrega'
    ? `Gostaria de receber em:\n${endereco}`
    : 'Vou retirar o pedido na loja.';

  const msg =
`Olá! Gostaria de fazer o seguinte pedido:

Nome: ${name}

Produtos:
${lines}

Total: ${fmt(total)}

${entregaTexto}`;

  const phone = '5511913737261'; // ← troque pelo número real
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');

  cart = [];
  renderCart();
  closeModal();
  document.getElementById('clientName').value = '';
  // limpa endereço
  ['addrRua','addrNum','addrComp','addrBairro'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  document.getElementById('addressFields').classList.remove('show');
  document.querySelector('input[name="delivery"][value="retirada"]').checked = true;
  showToast('Pedido enviado! Aguarde a confirmação pelo WhatsApp. 🎉');
}

/* =========================================
   TOAST
   ========================================= */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);background:#111;color:#fff;padding:.8rem 1.4rem;border-radius:50px;font-size:.85rem;font-weight:600;z-index:9999;opacity:0;transition:all .3s ease;white-space:nowrap;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,.25);';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 3500);
}

/* =========================================
   HEADER SCROLL
   ========================================= */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =========================================
   MOBILE NAV
   ========================================= */
const menuToggle = document.getElementById('menuToggle');
const nav        = document.getElementById('nav');
const navOverlay = document.getElementById('navOverlay');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  navOverlay.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navOverlay.addEventListener('click', closeMobileNav);
nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMobileNav));
function closeMobileNav() {
  nav.classList.remove('open');
  menuToggle.classList.remove('open');
  navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* =========================================
   ACTIVE NAV ON SCROLL
   ========================================= */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  document.querySelectorAll('.bottom-nav-item[href]').forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
}, { passive: true });

/* =========================================
   INIT
   ========================================= */
renderProducts();
renderCart();
