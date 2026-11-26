import { siteConfig } from '@/data/siteConfig';

export function getTheme(): 'light' | 'dark' | null {
  try {
    const raw = localStorage.getItem(siteConfig.storageKeys.theme);
    const v = raw?.replace(/^"|"$/g, '');
    if (v === 'light' || v === 'dark') return v;
    return null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(siteConfig.storageKeys.theme, theme);
  } catch {
    // quota exceeded or private browsing
  }
}
