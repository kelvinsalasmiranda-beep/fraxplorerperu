'use client';



import { GoogleOAuthProvider } from '@react-oauth/google';

import { LanguageProvider } from '@/context/LanguageContext';

import { AuthProvider } from '@/context/AuthContext';

import { getGoogleClientId } from '@/lib/google-auth';



export default function AppProviders({ children }: { children: React.ReactNode }) {

  const clientId = getGoogleClientId();



  const tree = (

    <LanguageProvider>

      <AuthProvider>{children}</AuthProvider>

    </LanguageProvider>

  );



  if (!clientId) return tree;



  return <GoogleOAuthProvider clientId={clientId}>{tree}</GoogleOAuthProvider>;

}

