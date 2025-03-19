'use client';

import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/');
    }
  }, [session, isLoading, router]);

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
