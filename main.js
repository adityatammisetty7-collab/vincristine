// ── NAVBAR scroll effect ─────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Floating particles in hero ────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  const colours   = ['#3b82f6','#60a5fa','#22c55e','#4ade80','#14b8a6'];
  for (let i = 0; i < 28; i++) {
    const p   = document.createElement('div');
    const size = 4 + Math.random() * 18;
    p.className = 'particle';
    Object.assign(p.style, {
      width:  size + 'px',
      height: size + 'px',
      left:   Math.random() * 100 + '%',
      top:    Math.random() * 100 + '%',
      background: colours[Math.floor(Math.random() * colours.length)],
      animationDelay:    (Math.random() * 6) + 's',
      animationDuration: (5 + Math.random() * 6) + 's',
    });
    container.appendChild(p);
  }
})();

// ── Scroll-reveal animation ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.info-card, .mech-step, .cancer-card, .se-category, .ref-item, ' +
  '.about-text, .structure-img-wrap, .properties-panel, .highlight-box, ' +
  '.chemo-importance, .se-note, .mechanism-note'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Tab switching ─────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    // update buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // update panels
    document.querySelectorAll('.tab-content').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'tab-' + target);
    });
  });
});

// ── Active nav link highlight on scroll ───────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = '';
        a.style.background = '';
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = 'var(--blue-600)';
          a.style.background = 'var(--blue-50)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));
