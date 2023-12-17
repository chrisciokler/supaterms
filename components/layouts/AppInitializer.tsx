"use client"
import { install } from 'resize-observer';
import React, { useEffect } from 'react';
import { supabase } from '@/configs/supabase';
import { setCookie } from 'cookies-next';
import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { api } from '@/apis';
import { redirect, usePathname, useRouter } from 'next/navigation';

export type Auth = Session | null
export type AuthStoreProps = {
  auth: Auth,
  setAuth: (auth: Auth) => void,
  openaitoken: string | null,
  openaiorg: string | null,
  setOpenAiCredentials: (openaitoken: string, openaiorg: string) => void
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  auth: null,
  openaitoken: null,
  openaiorg: null,
  setAuth: (auth: Auth) => {
    set(() => ({ auth }))
    setCookie('auth', auth)
  },
  setOpenAiCredentials: (openaitoken: string, openaiorg: string) => set(() => ({ openaitoken, openaiorg }))
}));


export const AppInitializer = ({ children, auth }: { children: React.ReactNode, auth?: Auth }) => {
  const router = useRouter()
  const setAuth = useAuthStore(state => state.setAuth);
  const setOpenAiCredentials = useAuthStore(state => state.setOpenAiCredentials);

  const manageUser = async (session: Session | null) => {
    const data = await api.db.getOpenAIToken()
    setAuth(session);
    data && setOpenAiCredentials(data.token, data.organization);
    const pathname = window.location.pathname;

    if (session && pathname === '/authenticate') {
      router.replace('/')
    }

    if (!session && pathname !== '/docs') {
      router.replace('/')
    }

    if (!session && pathname !== '/account') {
      router.replace('/')
    }

    if (!session && pathname !== '/terms') {
      router.replace('/')
    }

    if (!session && pathname !== '/privacy') {
      router.replace('/')
    }

  }

  useEffect(() => {
    if (!window.ResizeObserver) install();

    supabase.auth.getSession().then(({ data: { session } }) => {
      manageUser(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      manageUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {children}
    </>
  );
};
