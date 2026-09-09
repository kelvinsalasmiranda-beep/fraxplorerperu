'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  type AuthUser,
  clearStoredUser,
  decodeGoogleCredential,
  getGoogleClientId,
  loadStoredUser,
  storeUser,
} from '@/lib/google-auth';

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  googleEnabled: boolean;
  signInWithGoogle: (credential: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const googleEnabled = Boolean(getGoogleClientId());

  useEffect(() => {
    setUser(loadStoredUser());
    setReady(true);
  }, []);

  const signInWithGoogle = useCallback((credential: string) => {
    const profile = decodeGoogleCredential(credential);
    setUser(profile);
    storeUser(profile);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    clearStoredUser();
  }, []);

  const value = useMemo(
    () => ({ user, ready, googleEnabled, signInWithGoogle, signOut }),
    [user, ready, googleEnabled, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
