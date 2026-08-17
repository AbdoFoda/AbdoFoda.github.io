const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('a.nav-link');
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'].map(id => document.getElementById(id));

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

mobileMenu.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const icon = menuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// Active nav link on scroll
function onScroll() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  let current = 'home';

  for (const section of sections) {
    if (section && section.offsetTop <= scrollPos) {
      current = section.id;
    }
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.link === current);
  });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact form — uses mailto fallback until Formspree is configured
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', e => {
  const action = form.getAttribute('action');
  if (action.includes('xplaceholder')) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:abdofoda2016@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Opening your email client...';
    formStatus.className = 'text-center text-sm text-accent';
    formStatus.classList.remove('hidden');
  }
});
