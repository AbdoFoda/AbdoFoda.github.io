const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('a.nav-link');
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'].map(id => document.getElementById(id));

// Injected at deploy time from GitHub secret CONTACT_EMAIL (never committed to the repo)
const CONTACT_EMAIL = '__CONTACT_EMAIL__';

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

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = 'text-center text-sm mt-2';
  formStatus.classList.add(type === 'error' ? 'text-red-400' : 'text-accent');
  formStatus.classList.remove('hidden');
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  if (!CONTACT_EMAIL.includes('@')) {
    setFormStatus('Contact form is not configured yet.', 'error');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const botcheck = document.getElementById('botcheck');

  if (botcheck.checked) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  formStatus.classList.add('hidden');

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio message from ${name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to send message');
    }

    form.reset();
    setFormStatus('Message sent! I\'ll get back to you soon.', 'success');
  } catch (err) {
    setFormStatus('Something went wrong. Please try again in a moment.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});
