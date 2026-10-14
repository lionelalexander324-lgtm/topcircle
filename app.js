const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea');
        field.value = value; field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.appendChild(field); field.select();
        const copied = document.execCommand('copy'); field.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      showToast('Official UID copied');
    } catch { showToast('Please copy the UID manually: ' + value); }
  });
});
