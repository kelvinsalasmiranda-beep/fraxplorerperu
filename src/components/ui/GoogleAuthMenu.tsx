'use client';

import Image from 'next/image';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

type Props = {
  compact?: boolean;
  className?: string;
};

export default function GoogleAuthMenu({ compact = false, className = '' }: Props) {
  const { t } = useLanguage();
  const { user, ready, googleEnabled, signInWithGoogle, signOut } = useAuth();

  if (!ready || !googleEnabled) return null;

  if (user) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {user.picture && (
          <Image
            src={user.picture}
            alt=""
            width={compact ? 28 : 32}
            height={compact ? 28 : 32}
            className="rounded-full border border-white/30"
            unoptimized
          />
        )}
        <div className="min-w-0">
          {!compact && (
            <p className="truncate text-[10px] font-medium opacity-90">{t.nav.loggedInAs}</p>
          )}
          <p className="truncate text-xs font-semibold max-w-[120px]">{user.givenName || user.name}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            googleLogout();
            signOut();
          }}
          className={`shrink-0 rounded-full border border-current/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wide transition hover:bg-white/10 ${
            compact ? 'py-0.5' : ''
          }`}
        >
          {t.nav.logout}
        </button>
      </div>
    );
  }

  return (
    <div className={`google-auth-menu ${className}`}>
      <GoogleLogin
        onSuccess={(res) => {
          if (res.credential) signInWithGoogle(res.credential);
        }}
        onError={() => undefined}
        text="signin_with"
        size={compact ? 'medium' : 'large'}
        shape="pill"
        theme="outline"
        width={compact ? 180 : 220}
      />
    </div>
  );
}
