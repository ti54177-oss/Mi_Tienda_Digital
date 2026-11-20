const products = [
  {id:1,section:'hombre',category:'playeras',name:'Playera deportiva',detail:'Tela ligera · Negro',price:299,image:'assets/prenda-01.jpg'},
  {id:2,section:'hombre',category:'sudaderas',name:'Sudadera training',detail:'Deportiva · Gris',price:549,image:'assets/prenda-02.jpg'},
  {id:3,section:'hombre',category:'pantalones',name:'Jogger deportivo',detail:'Stretch · Negro',price:449,image:'assets/prenda-03.jpg'},
  {id:4,section:'hombre',category:'playeras',name:'Jersey deportivo',detail:'Tela dry fit · Azul',price:329,image:'assets/prenda-04.jpg'},
  {id:5,section:'mujer',category:'tops',name:'Top deportivo',detail:'Soporte medio · Negro',price:249,image:'assets/prenda-05.jpg'},
  {id:6,section:'mujer',category:'playeras',name:'Playera training',detail:'Tela ligera · Lila',price:289,image:'assets/prenda-06.jpg'},
  {id:7,section:'mujer',category:'pantalones',name:'Leggings deportivos',detail:'Tela stretch · Negro',price:399,image:'assets/prenda-07.jpg'},
  {id:8,section:'mujer',category:'tops',name:'Short deportivo',detail:'Tela ligera · Rosa',price:279,image:'assets/prenda-08.jpg'},
  {id:9,section:'ninos',category:'playeras',name:'Playera sport junior',detail:'Tela ligera · Verde',price:199,image:'assets/prenda-09.jpg'},
  {id:10,section:'ninos',category:'sudaderas',name:'Sudadera junior',detail:'Deportiva · Azul',price:349,image:'assets/prenda-10.jpg'},
  {id:11,section:'ninos',category:'pantalones',name:'Pants junior',detail:'Cómodo · Gris',price:299,image:'assets/prenda-11.jpg'},
  {id:12,section:'ninos',category:'playeras',name:'Short deportivo junior',detail:'Tela ligera · Negro',price:189,image:'assets/prenda-12.jpg'}
];
const cart = [];
const money = n => '$' + n.toLocaleString('es-MX') + ' MXN';

function renderSection(section,filter='todos',query=''){
  const grid=document.getElementById(`grid-${section}`);
  const list=products.filter(p=>p.section===section&&(filter==='todos'||p.category===filter)&&(`${p.name} ${p.detail} ${p.category}`).toLowerCase().includes(query.toLowerCase()));
  grid.innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-visual"><span class="product-tag">ESENCIA / BÁSICO</span><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy"><button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">+</button></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.detail}</p></div><span class="product-price">${money(p.price)}</span></div></article>`).join(''):'<p class="no-results">No encontramos prendas con esa búsqueda.</p>';
}
const activeFilters={hombre:'todos',mujer:'todos',ninos:'todos'};
function renderAll(query=''){['hombre','mujer','ninos'].forEach(s=>renderSection(s,activeFilters[s],query));}
renderAll();

document.querySelectorAll('.filter-row').forEach(row=>row.addEventListener('click',e=>{
  const btn=e.target.closest('[data-filter]'); if(!btn)return;
  const section=row.dataset.filterGroup; activeFilters[section]=btn.dataset.filter;
  row.querySelectorAll('.filter-chip').forEach(b=>b.classList.toggle('active',b===btn));
  renderSection(section,activeFilters[section],document.getElementById('searchInput').value);
}));
document.getElementById('searchInput').addEventListener('input',e=>renderAll(e.target.value));
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200);}
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add]');if(!btn)return;
  const p=products.find(x=>x.id===Number(btn.dataset.add));cart.push(p);
  document.getElementById('cartCount').textContent=cart.length;
  toast(`${p.name} se agregó a tu bolsa.`);
});
document.getElementById('cartButton').addEventListener('click',()=>toast(cart.length?`Tu bolsa tiene ${cart.length} ${cart.length===1?'prenda':'prendas'}. Total: ${money(cart.reduce((s,p)=>s+p.price,0))}`:'Tu bolsa está vacía por ahora.'));
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletterMessage').textContent='¡Gracias! Tu correo quedó registrado en esta demostración.';e.target.reset();});
document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));