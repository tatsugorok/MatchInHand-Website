const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const button = contactForm.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  const data = Object.fromEntries(new FormData(contactForm));
  button.disabled = true;
  status.dataset.state = '';
  status.textContent = window.MIH_I18N.t('Sending your message…');

  fetch('https://formsubmit.co/ajax/Benoit.gille@tjl-studio.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) throw new Error('Submission failed');
      return response.json();
    })
    .then(() => {
      contactForm.reset();
      status.dataset.state = 'success';
      status.textContent = window.MIH_I18N.t('Thank you. Your message has been sent.');
    })
    .catch(() => {
      status.dataset.state = 'error';
      status.textContent = window.MIH_I18N.t('We could not send your message. Please try again.');
    })
    .finally(() => { button.disabled = false; });
});
