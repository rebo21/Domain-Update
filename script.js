(() => {
  'use strict';
  const config = window.PORTAL_CONFIG;
  if (!config || !config.portalUrl) return;
  let portal;
  try {
    portal = new URL(config.portalUrl);
    if (portal.protocol !== 'https:' || portal.username || portal.password) return;
  } catch {
    return;
  }
  const address = document.getElementById('portal-address');
  const open = document.getElementById('open-portal');
  address.href = portal.href;
  address.textContent = portal.href;
  open.href = portal.href;
  document.getElementById('destination').hidden = false;
  document.getElementById('bookmark-note').hidden = false;
  document.getElementById('pending-message').hidden = true;
  open.hidden = false;
  const copy = document.getElementById('copy-link');
  const status = document.getElementById('copy-status');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error();
      await navigator.clipboard.writeText(portal.href);
      status.textContent = 'Link copied. You can paste it into your browser.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(address);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Press and hold the address, or right-click it, to copy the link.';
    }
  });
})();
