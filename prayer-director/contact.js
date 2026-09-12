const CONTACT_EMAIL = '__CONTACT_EMAIL__';

const form = document.getElementById('support-form');
const formStatus = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.hidden = false;
  formStatus.className = 'form-status' + (type === 'error' ? ' is-error' : ' is-success');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!CONTACT_EMAIL.includes('@')) {
    setFormStatus('Support form is not set up yet.', 'error');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const botcheck = document.getElementById('botcheck');

  if (botcheck.checked) return;

  submitBtn.disabled = true;
  const previousLabel = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';
  formStatus.hidden = true;

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Prayer Director support from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to send message');
    }

    form.reset();
    setFormStatus('Sent. We will get back to you soon.', 'success');
  } catch (err) {
    setFormStatus('Failed to send. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = previousLabel;
  }
});
