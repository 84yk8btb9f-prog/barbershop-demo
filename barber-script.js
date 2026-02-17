/* =============================================
   BARBERHAUS — SHARED JAVASCRIPT
   ============================================= */

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function () {

  // ─── LANGUAGE SWITCHER ───
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === 'en') btn.classList.add('active');
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      langButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentLang = lang;
      applyLanguage(lang);
    });
  });
  applyLanguage('en');

  // ─── MOBILE MENU ───
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('open');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── NAVBAR SCROLL EFFECT ───
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.style.padding = '0.8rem 0';
        navbar.style.borderBottomColor = 'rgba(201,168,76,0.18)';
      } else {
        navbar.style.padding = '1.2rem 0';
        navbar.style.borderBottomColor = 'rgba(201,168,76,0.1)';
      }
    }
  });

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ─── GALLERY FILTERS ───
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ─── SERVICES TABS ───
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const target = this.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      tabPanels.forEach(panel => {
        panel.style.display = panel.id === target ? 'block' : 'none';
      });
    });
  });

  // ─── BOOKING FORM ───
  const bookingForm = document.querySelector('.booking-form-el');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast(
        currentLang === 'en'
          ? '✓ Appointment request sent! We\'ll confirm shortly.'
          : '✓ Το αίτημα στάλθηκε! Θα επιβεβαιώσουμε σύντομα.'
      );
      bookingForm.reset();
    });
  }

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

});

// ─── APPLY LANGUAGE ───
function applyLanguage(lang) {
  document.querySelectorAll('[data-en][data-gr]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.tagName === 'INPUT' && el.type !== 'submit') {
      el.placeholder = text;
    } else if (el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });
}

// ─── TOAST NOTIFICATION ───
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fas fa-check-circle"></i><span></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
