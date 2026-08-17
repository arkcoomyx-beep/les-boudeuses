/**
 * Les Boudeuses — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initImages();
  initNavigation();
  initAnchorScroll();
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
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav__menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('nav__menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Anchor scroll avec compensation du header fixe */
function initAnchorScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  function getScrollOffset() {
    return header.getBoundingClientRect().height + 16;
  }

  function scrollToTarget(target, behavior = 'smooth') {
    if (!target) return;

    const top = target.id === 'accueil'
      ? 0
      : window.scrollY + target.getBoundingClientRect().top - getScrollOffset();

    window.scrollTo({ top: Math.max(0, top), behavior });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      scrollToTarget(target);
      history.pushState(null, '', hash);
    });
  });

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => scrollToTarget(target, 'instant'));
    }
  }
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
