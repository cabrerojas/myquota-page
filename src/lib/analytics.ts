// Minimal analytics helper that pushes to window.dataLayer
type Payload = Record<string, any>;

function ensureDataLayer() {
  if (!(window as any).dataLayer) (window as any).dataLayer = [];
}

export function pushEvent(event: string, payload: Payload = {}) {
  try {
    ensureDataLayer();
    const p = { event, timestamp: Date.now(), ...payload };
    (window as any).dataLayer.push(p);
    // also log to console for local verification
    // avoid leaking emails: callers should hash emails before passing
    // eslint-disable-next-line no-console
    console.debug('dataLayer push', p);
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('analytics push failed', e);
    return false;
  }
}

export function hashEmail(email: string) {
  // lightweight hashing (not cryptographically secure) for analytics: djb2
  let hash = 5381;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 33) ^ email.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}
