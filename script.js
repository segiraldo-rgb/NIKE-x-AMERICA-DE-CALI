document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-stuck', window.scrollY > 180);
  }, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
    nav?.classList.toggle('is-open', !open);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-visible'));
  }

  const phone = '573001234567';
  document.querySelectorAll('[data-product]').forEach(button => {
    button.addEventListener('click', () => {
      const select = document.querySelector('#interest');
      if (select) select.value = button.dataset.product;
      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelector('#contact-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const interest = String(data.get('interest') || 'Consulta general');
    const message = String(data.get('message') || '').trim();
    if (!name || !email) {
      document.querySelector('#form-status').textContent = 'Completa tu nombre y correo electrónico.';
      return;
    }
    const text = `Hola, soy ${name} (${email}). Estoy interesado en: ${interest}.${message ? ` Mensaje: ${message}` : ''}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
});
