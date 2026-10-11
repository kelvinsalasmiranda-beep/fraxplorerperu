export type AuthUser = {
  id: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
};

export const AUTH_STORAGE_KEY = 'fraxplorer-auth-user';

export function getGoogleClientId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? '';
}

function safeHttpsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

function sanitizeUser(user: AuthUser): AuthUser {
  return {
    ...user,
    id: String(user.id ?? '').slice(0, 128),
    email: String(user.email ?? '').slice(0, 254),
    name: String(user.name ?? 'Usuario').slice(0, 120),
    givenName: user.givenName ? String(user.givenName).slice(0, 80) : undefined,
    familyName: user.familyName ? String(user.familyName).slice(0, 80) : undefined,
    picture: safeHttpsUrl(user.picture),
  };
}

export function decodeGoogleCredential(credential: string): AuthUser {
  const payload = credential.split('.')[1];
  if (!payload) throw new Error('Invalid Google credential');

  const decoded = JSON.parse(
    atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  ) as {
    sub: string;
    email?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  };

  return sanitizeUser({
    id: decoded.sub,
    email: decoded.email ?? '',
    name: decoded.name ?? decoded.email ?? 'Usuario',
    givenName: decoded.given_name,
    familyName: decoded.family_name,
    picture: decoded.picture,
  });
}

export function loadStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? sanitizeUser(JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sanitizeUser(user)));
}

export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
