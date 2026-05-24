/* ============================================================
   js/main.js
   Portfolio — Alex Mercer
   ============================================================ */

/* ─── 1. LOADER ─────────────────────────────────────────────
   Animates the loading bar then hides the loader screen
   ─────────────────────────────────────────────────────────── */
const loader    = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      revealHeroElements();
    }, 300);
  }
  loaderBar.style.width = progress + '%';
}, 80);


/* ─── 2. HERO REVEAL ────────────────────────────────────────
   Fades in hero content after loader finishes
   ─────────────────────────────────────────────────────────── */
function revealHeroElements() {
  const heroItems = document.querySelectorAll(
    '.hero-photo-wrap, .hero-greeting, .hero-name, .hero-role, .hero-bio, .hero-btns, .hero-social'
  );
  heroItems.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}


/* ─── 3. STICKY AVATAR ──────────────────────────────────────
   Photo starts big in hero. When user scrolls past the hero,
   a small version of the photo flies up into the top-right corner.
   ─────────────────────────────────────────────────────────── */
const stickyAvatar   = document.getElementById('stickyAvatar');
const stickyImg      = document.getElementById('stickyImg');
const stickyFallback = document.getElementById('stickyFallback');
const heroSection    = document.getElementById('home');

// Copy the same src from the hero photo into sticky avatar
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto && heroPhoto.src) {
  stickyImg.src = heroPhoto.src;
}

// If hero photo fails (no file), show initials in sticky too
heroPhoto.addEventListener('error', () => {
  stickyImg.style.display      = 'none';
  stickyFallback.style.display = 'flex';
});

window.addEventListener('scroll', () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;

  // Show sticky avatar once hero photo scrolls out of view
  if (heroBottom < 80) {
    stickyAvatar.classList.add('visible');
  } else {
    stickyAvatar.classList.remove('visible');
  }
}, { passive: true });


/* ─── 4. HEADER SOLID ON SCROLL ────────────────────────────
   Adds a frosted-glass background to nav after scrolling 60px
   ─────────────────────────────────────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });


/* ─── 5. ACTIVE NAV LINK ────────────────────────────────────
   Highlights the correct nav link based on which section
   is currently in view
   ─────────────────────────────────────────────────────────── */
const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });


/* ─── 6. MOBILE HAMBURGER MENU ──────────────────────────────
   Opens / closes the full-screen mobile drawer
   ─────────────────────────────────────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileDrawer.classList.toggle('open');
  document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
});

// Close drawer when a link is clicked
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ─── 7. ANIMATED DOT CANVAS ────────────────────────────────
   Draws animated dots that connect with lines.
   Dots gently float away from the mouse cursor.
   ─────────────────────────────────────────────────────────── */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let dots     = [];
let mouse    = { x: -999, y: -999 };

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  buildDots();
}

function buildDots() {
  dots = [];
  const count = Math.floor((canvas.width * canvas.height) / 14000);
  for (let i = 0; i < count; i++) {
    dots.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.6 + 0.6,
    });
  }
}

document.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach(d => {
    // Move dot
    d.x += d.vx;
    d.y += d.vy;

    // Bounce off edges
    if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

    // Repel from mouse
    const dx   = d.x - mouse.x;
    const dy   = d.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 110) {
      d.x += (dx / dist) * 1.4;
      d.y += (dy / dist) * 1.4;
    }

    // Draw dot
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 255, 71, 0.5)';
    ctx.fill();
  });

  // Draw connecting lines between nearby dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx   = dots[i].x - dots[j].x;
      const dy   = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(201, 255, 71, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawCanvas);
}

resizeCanvas();
drawCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });


/* ─── 8. SCROLL REVEAL ──────────────────────────────────────
   Watches all .reveal elements and adds .visible when
   they enter the viewport, triggering CSS animation
   ─────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 9. COUNT-UP NUMBERS (About stats) ─────────────────────
   Counts numbers up from 0 when the stats box scrolls into view
   ─────────────────────────────────────────────────────────── */
function countUp(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const run  = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start < target) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.count-up').forEach(el => {
          countUp(el, parseInt(el.dataset.target), 1600);
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const statsBox = document.querySelector('.stats-box');
if (statsBox) statsObserver.observe(statsBox);


/* ─── 10. SKILLS TABS ───────────────────────────────────────
   Switches between Frontend / Backend / Database / DevOps tabs.
   No percentage bars — uses card grid now.
   ─────────────────────────────────────────────────────────── */
const tabBtns     = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = 'tab-' + btn.dataset.tab;
    tabContents.forEach(panel => {
      panel.classList.toggle('active', panel.id === target);
    });
  });
});


/* ─── 11. PROJECT FILTER ────────────────────────────────────
   Shows / hides project cards by category with fade animation.
   Also hides the featured project if its category doesn't match.
   ─────────────────────────────────────────────────────────── */
const filterBtns      = document.querySelectorAll('.filter');
const projectCards    = document.querySelectorAll('.project-card');
const featuredProject = document.querySelector('.featured-project');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Featured project visibility
    if (featuredProject) {
      const featCat  = featuredProject.dataset.cat;
      const showFeat = filter === 'all' || filter === featCat;
      featuredProject.style.transition = 'opacity 0.3s, transform 0.3s';
      if (showFeat) {
        featuredProject.style.display  = 'grid';
        requestAnimationFrame(() => {
          featuredProject.style.opacity   = '1';
          featuredProject.style.transform = '';
        });
      } else {
        featuredProject.style.opacity   = '0';
        featuredProject.style.transform = 'translateY(10px)';
        setTimeout(() => { featuredProject.style.display = 'none'; }, 300);
      }
    }

    // Card visibility
    projectCards.forEach(card => {
      const cardCat = card.dataset.cat;
      const show    = filter === 'all' || filter === cardCat;

      card.style.transition = 'opacity 0.3s, transform 0.3s';

      if (show) {
        card.classList.remove('hidden');
        requestAnimationFrame(() => {
          card.style.opacity   = '1';
          card.style.transform = '';
        });
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => card.classList.add('hidden'), 280);
      }
    });
  });
});


/* ─── 12. 3D CARD TILT ──────────────────────────────────────
   Makes project cards tilt slightly toward the mouse — gives
   a premium depth effect
   ─────────────────────────────────────────────────────────── */
document.querySelectorAll('.project-card, .featured-project').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y     = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ─── 13. CONTACT FORM ──────────────────────────────────────
   Handles form submission with a loading state.
   Currently simulates a send — replace setTimeout with a real
   API call (Formspree, EmailJS, etc.)
/* ─── CONTACT FORM ─────────────────────────────────────── */
// ✅ Paste your EmailJS keys here:
const EMAILJS_PUBLIC_KEY  = 'Xf5Gjurap9ZQg6d_r';     // from Account → General
const EMAILJS_SERVICE_ID  = 'service_uuoevs8';     // e.g. service_abc123
const EMAILJS_TEMPLATE_ID = 'template_e5bpjld';   // e.g. template_xyz789

// Load EmailJS SDK
const emailScript = document.createElement('script');
emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
emailScript.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
document.head.appendChild(emailScript);

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;

    const templateParams = {
      from_name:  document.getElementById('fname').value,
      from_email: document.getElementById('femail').value,
      subject:    document.getElementById('fsubject').value,
      message:    document.getElementById('fmessage').value,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        contactForm.reset();
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled    = false;
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled    = false;
        alert('Something went wrong. Please try again.');
      });
  });
}

/* ─── 14. SMOOTH SCROLL ─────────────────────────────────────
   Overrides default anchor jump with a smooth scroll
   that accounts for the fixed header height
   ─────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    const target   = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});


/* ─── 15. HERO PARALLAX ─────────────────────────────────────
   Gently moves the hero text upward as you scroll,
   creating a layered depth effect
   ─────────────────────────────────────────────────────────── */
const heroText = document.querySelector('.hero-text');

window.addEventListener('scroll', () => {
  if (!heroText) return;
  if (window.scrollY < window.innerHeight) {
    heroText.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }
}, { passive: true });
