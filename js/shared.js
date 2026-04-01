/* ══════════════════════════════════════════
   VISTACRAFT HOMES — SHARED JS (shared.js)
══════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cdot  = document.getElementById('cdot');
const cring = document.getElementById('cring');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px';
  cdot.style.top  = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cring.style.left = rx + 'px';
  cring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, input, select, textarea, label').forEach(el => {
  el.addEventListener('mouseenter', () => cring.classList.add('hov'));
  el.addEventListener('mouseleave', () => cring.classList.remove('hov'));
});

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const bar = document.getElementById('prog');
  if (bar) bar.style.width = (p * 100) + '%';
}, { passive: true });

/* ── HAMBURGER ── */
const hbg = document.getElementById('hbg');
const mob  = document.getElementById('mob');
if (hbg && mob) {
  const s1 = document.getElementById('h1');
  const s2 = document.getElementById('h2');
  const s3 = document.getElementById('h3');
  let open = false;
  hbg.addEventListener('click', () => {
    open = !open;
    mob.classList.toggle('open', open);
    if (s1) s1.style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
    if (s2) s2.style.opacity   = open ? '0' : '1';
    if (s3) s3.style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });
}
function closeMob() {
  const mob = document.getElementById('mob');
  const s1  = document.getElementById('h1');
  const s2  = document.getElementById('h2');
  const s3  = document.getElementById('h3');
  if (mob) mob.classList.remove('open');
  if (s1) s1.style.transform = '';
  if (s2) s2.style.opacity   = '1';
  if (s3) s3.style.transform = '';
}

/* ── SCROLL ANIMATIONS ── */
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      animObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.anim-up, .anim-in, .anim-left, .anim-right').forEach(el => animObs.observe(el));

/* ── VIDEO PARALLAX (hero only) ── */
const heroVid = document.getElementById('heroVid');
window.addEventListener('scroll', () => {
  if (heroVid) heroVid.style.transform = `scale(1.06) translateY(${window.scrollY * 0.1}px)`;
}, { passive: true });

/* ── FLOOR PLAN TABS ── */
function showFP(idx, btn) {
  document.querySelectorAll('.fp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.fp-tab').forEach(b => b.classList.remove('active'));
  const panels = document.querySelectorAll('.fp-panel');
  if (panels[idx]) panels[idx].classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ── LIGHTBOX ── */
function openLbx(imgSrc, imgFallback, title, desc) {
  const img = document.getElementById('limg');
  if (!img) return;
  img.src = imgSrc;
  img.onerror = () => { img.src = imgFallback; };
  document.getElementById('ltit').textContent = title;
  document.getElementById('ldesc').textContent = desc;
  document.getElementById('lbx').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLbx(e) {
  const lb = document.getElementById('lbx');
  if (!e || e.target === lb || e.currentTarget.tagName === 'BUTTON') {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLbx({ target: document.getElementById('lbx') });
});

/* ── CONTACT FORM ── */
function doForm(e) {
  e.preventDefault();
  const ok = document.getElementById('cfok');
  if (ok) {
    ok.classList.add('show');
    e.target.reset();
    setTimeout(() => ok.classList.remove('show'), 7000);
  }
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── ACTIVE NAV LINK ── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nlinks a, #mob a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html') ||
        (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

function handleMailtoSubmit(event) {
  event.preventDefault(); // Stop the form from doing a page refresh

  // 1. Grab all the values from the form
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('emailAddress').value;
  const phone = document.getElementById('phoneNumber').value || 'Not provided';
  const interest = document.getElementById('apartmentInterest').value || 'Not specified';
  const plan = document.getElementById('paymentPlan').value || 'Not specified';
  const message = document.getElementById('message').value || 'No message left.';

  // 2. Create the email subject and body
  const subject = encodeURIComponent(`New Enquiry: Tea's Court II - ${firstName} ${lastName}`);
  
  const body = encodeURIComponent(
    `Hello Vistacraft Homes Team,\n\n` +
    `I am interested in Tea's Court II. Here are my details:\n\n` +
    `Name: ${firstName} ${lastName}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Apartment Interest: ${interest}\n` +
    `Preferred Payment Plan: ${plan}\n\n` +
    `Message:\n${message}\n`
  );

  // 3. Show the success message UI briefly
  const okMessage = document.getElementById('cfok');
  if (okMessage) {
    okMessage.style.display = 'flex';
  }

  // 4. Fire the mailto link to open the user's email client
  window.location.href = `mailto:contact@vistacrafthomes.com?subject=${subject}&body=${body}`;
}