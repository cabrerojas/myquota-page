// AB assignment helper
export function getABVariant(): 'A' | 'B' {
  try {
    const cookieName = 'ab_assignment';
    const existing = document.cookie.split('; ').find((c) => c.startsWith(cookieName + '='));
    if (existing) {
      const val = existing.split('=')[1];
      if (val === 'A' || val === 'B') return val;
    }

    // assign randomly
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    const days = 7;
    const expires = new Date(Date.now() + days * 86400_000).toUTCString();
    document.cookie = `${cookieName}=${variant}; path=/; expires=${expires}; samesite=lax`;
    return variant;
  } catch (e) {
    return 'A';
  }
}

export function readABVariant(): 'A' | 'B' | null {
  try {
    const cookieName = 'ab_assignment';
    const existing = document.cookie.split('; ').find((c) => c.startsWith(cookieName + '='));
    if (existing) {
      const val = existing.split('=')[1];
      if (val === 'A' || val === 'B') return val;
    }
    return null;
  } catch (e) {
    return null;
  }
}
