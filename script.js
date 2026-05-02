const revealItems = document.querySelectorAll('.timeline-item, .achievement-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : 'var(--muted)';
  });
});

const modal = document.getElementById('img-modal');
const modalBackdrop = modal && modal.querySelector('.img-modal-backdrop');
const modalGallery = modal && modal.querySelector('.img-modal-gallery');
const modalClose = modal && modal.querySelector('.img-modal-close');

function openModalWithImages(urls) {
  if (!modal) return;
  modalGallery.innerHTML = '';
  if (urls.length > 1) {
    modal.classList.add('stack-vertical');
  } else {
    modal.classList.remove('stack-vertical');
  }
  urls.forEach(u => {
    const img = document.createElement('img');
    img.src = u;
    img.alt = 'Certificate image';
    modalGallery.appendChild(img);
  });
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalClose && modalClose.focus(), 120);
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalGallery.innerHTML = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.show-cert-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.achievement-card');
    if (!card) return;
    const imgs = Array.from(card.querySelectorAll('.ach-hover-images img')).map(i => i.src);
    if (imgs.length === 0) return;
    openModalWithImages(imgs);
  });
});

modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
modalClose && modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
