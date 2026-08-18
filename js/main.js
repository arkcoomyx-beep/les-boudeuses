/**
 * Les Boudeuses — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initImages();
  initNavigation();
  initMenuTabs();
  initLightbox();
  initScrollReveal();
  initOpenStatus();
});

/* Navigation */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav__link');

  function setNavOpen(isOpen, animate = false) {
    navMenu.classList.toggle('nav__menu--animate', animate);
    navBackdrop?.classList.toggle('nav__backdrop--animate', animate);
    navMenu.classList.toggle('nav__menu--open', isOpen);
    navToggle.classList.toggle('nav__toggle--open', isOpen);
    header.classList.toggle('header--menu-open', isOpen);
    navBackdrop?.classList.toggle('nav__backdrop--visible', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    navBackdrop?.setAttribute('tabindex', isOpen ? '0' : '-1');
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    setNavOpen(!navMenu.classList.contains('nav__menu--open'), true);
  });

  navBackdrop?.addEventListener('click', () => setNavOpen(false, true));

  navLinks.forEach(link => {
    link.addEventListener('click', () => setNavOpen(false, true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setNavOpen(false, true);
    }
  });

  window.addEventListener('resize', () => {
    setNavOpen(false, false);
  });

  navMenu.addEventListener('transitionend', (e) => {
    if (e.target === navMenu) {
      navMenu.classList.remove('nav__menu--animate');
      navBackdrop?.classList.remove('nav__backdrop--animate');
    }
  });
}

/* Menu tabs */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.carte__tab');
  const panels = {
    sale: document.getElementById('panel-sale'),
    sucre: document.getElementById('panel-sucre'),
    boissons: document.getElementById('panel-boissons')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('carte__tab--active'));
      tab.classList.add('carte__tab--active');

      Object.values(panels).forEach(panel => {
        panel.classList.remove('carte__panel--active');
      });
      panels[target].classList.add('carte__panel--active');
    });
  });
}

/* Lightbox gallery */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.galerie__item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.dataset.caption || img.alt;
      lightbox.classList.add('lightbox--open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
      closeLightbox();
    }
  });
}

/* Scroll reveal animations */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.concept__card, .feature, .menu-block, .info-card, .galerie__item, .carte__highlight'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* Open/closed status badge */
function initOpenStatus() {
  const badge = document.getElementById('open-status');
  if (!badge) return;

  const dot = badge.querySelector('.status-badge__dot');
  const text = badge.querySelector('.status-badge__text');

  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const openTime = 10 * 60 + 30; // 10:30
  const closeTime = 18 * 60 + 30; // 18:30

  const isWeekday = day >= 2 && day <= 6; // Tue-Sat
  const isOpen = isWeekday && currentTime >= openTime && currentTime < closeTime;

  badge.classList.add(isOpen ? 'status-badge--open' : 'status-badge--closed');
  text.textContent = isOpen ? 'Ouvert maintenant' : 'Fermé actuellement';
}
