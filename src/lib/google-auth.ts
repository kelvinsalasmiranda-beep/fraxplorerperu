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

  return {
    id: decoded.sub,
    email: decoded.email ?? '',
    name: decoded.name ?? decoded.email ?? 'Usuario',
    givenName: decoded.given_name,
    familyName: decoded.family_name,
    picture: decoded.picture,
  };
}

export function loadStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
