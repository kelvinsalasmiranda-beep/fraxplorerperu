export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

/** Categorías opcionales que el visitante puede activar o desactivar. */
export const OPTIONAL_CATEGORIES = ['analytics', 'marketing'] as const;

export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];

export type CookiePreferences = Record<OptionalCategory, boolean>;

export type StoredConsent = {
  version: number;
  decidedAt: string;
  preferences: CookiePreferences;
};

export const CONSENT_STORAGE_KEY = 'fraxplorer-cookie-consent';

/** Subir este número vuelve a pedir el consentimiento a todos los visitantes. */
export const CONSENT_VERSION = 1;

/** Se emite cuando el visitante guarda una decisión. */
export const CONSENT_CHANGED_EVENT = 'fraxplorer:cookie-consent-changed';

/** Lo emite el pie de página para reabrir el panel de preferencias. */
export const OPEN_SETTINGS_EVENT = 'fraxplorer:open-cookie-settings';

export const ACCEPT_ALL: CookiePreferences = { analytics: true, marketing: true };
export const REJECT_ALL: CookiePreferences = { analytics: false, marketing: false };

export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: CookiePreferences): StoredConsent {
  const consent: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    preferences,
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Modo incógnito o almacenamiento lleno: la decisión vale para esta visita.
  }
  window.dispatchEvent(new CustomEvent<StoredConsent>(CONSENT_CHANGED_EVENT, { detail: consent }));
  return consent;
}

/**
 * Consultar antes de cargar cualquier script de terceros (analítica, píxeles).
 * Las cookies necesarias no requieren consentimiento.
 */
export function hasConsent(category: CookieCategory): boolean {
  if (category === 'necessary') return true;
  return readConsent()?.preferences[category] ?? false;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
