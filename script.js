// THEME TOGGLE
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
  });
}

function updateThemeIcons(theme) {
  if (theme === 'light') {
    if(sunIcon) sunIcon.style.display = 'none';
    if(moonIcon) moonIcon.style.display = 'block';
  } else {
    if(sunIcon) sunIcon.style.display = 'block';
    if(moonIcon) moonIcon.style.display = 'none';
  }
}

// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
});

// TYPEWRITER EFFECT
const words = ["REAL.", "LUCRATIVO.", "RÁPIDO.", "MODERNO."];
let i = 0;
let timer;
const typewriter = document.getElementById('typewriter');

function typingEffect() {
  if (!typewriter) return;
  let word = words[i].split('');
  var loopTyping = function() {
    if (word.length > 0) {
      typewriter.innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 120);
  };
  loopTyping();
}

function deletingEffect() {
  if (!typewriter) return;
  let word = words[i].split('');
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      typewriter.innerHTML = word.join('');
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      typingEffect();
      return false;
    }
    timer = setTimeout(loopDeleting, 60);
  };
  loopDeleting();
}
if (typewriter) {
  typewriter.innerHTML = "";
  typingEffect();
}

// GLOW EFFECT MOUSE TRACKING
document.querySelectorAll('.glow-effect').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cursor){cursor.style.left=mx+'px';cursor.style.top=my+'px';}});
function animRing(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}
  requestAnimationFrame(animRing);
}
animRing();

// CANVAS PARTICLES
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  class Particle{
    constructor(){this.reset();}
    reset(){
      this.x=Math.random()*W;this.y=Math.random()*H;
      this.size=Math.random()*1.5+.3;
      this.speedX=(Math.random()-.5)*.3;this.speedY=(Math.random()-.5)*.3;
      this.opacity=Math.random()*.4+.05;
      this.isAccent=Math.random()>.85;
    }
    update(){
      this.x+=this.speedX;this.y+=this.speedY;
      if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
    }
    draw(){
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const rgb = this.isAccent ? '232,92,26' : (isLight ? '33,37,41' : '240,236,224');
      ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fillStyle=`rgba(${rgb},${this.opacity})`;ctx.fill();
    }
  }
  for(let i=0;i<120;i++)particles.push(new Particle());

  // GRID LINES
  function drawGrid(){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = isLight ? 'rgba(33,37,41,0.05)' : 'rgba(240,236,224,0.025)';
    ctx.lineWidth=1;
    for(let x=0;x<W;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  }
  function animate(){
    drawGrid();
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
  }
  animate();
}

// MARQUEE
const items=['Sites Profissionais','Lojas Virtuais','Sistemas Customizados','SEO & Performance','UX para Pequenos Negócios','Agendamento Online','E-commerce','Apps Web','APIs & Integrações'];
const track = document.getElementById('marquee');
if (track) {
  let html='';
  for(let i=0;i<4;i++)items.forEach(t=>html+=`<div class="marquee-item">${t}<span class="dot">●</span></div>`);
  track.innerHTML=html;
}

// CASES TABS
document.querySelectorAll('.case-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    
    document.querySelectorAll('.cases-display').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.case-tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(targetId).classList.add('active');
    btn.classList.add('active');
  });
});

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

// SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Animate step lines
      if(e.target.classList.contains('step'))e.target.classList.add('visible');
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.step').forEach(el=>observer.observe(el));

// Smooth nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const targetId = a.getAttribute('href');
    if (targetId === '#') return;
    const t = document.querySelector(targetId);
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

// LEAD FORM SUBMISSION
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const negocio = document.getElementById('negocio').value;
    const orcamento = document.getElementById('orcamento').value;
    
    const text = `Olá! Meu nome é ${nome}.\nMeu contato é: ${whatsapp}.\nTenho um negócio no segmento de: ${negocio}.\nMeu orçamento estimado é: ${orcamento}.\nGostaria de solicitar um orçamento para o meu projeto!`;
    
    const whatsappUrl = `https://wa.me/5561992866000?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  });
}
