"use client"
import { install } from 'resize-observer';
import React, { useEffect } from 'react';
import { supabase } from '@/configs/supabase';
import { setCookie } from 'cookies-next';
import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { stat } from 'fs';
import { api } from '@/apis';

type Auth = Session | null
type AuthStoreProps = {
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
  setAuth: (auth: Auth) => set(() => ({ auth })),
  setOpenAiCredentials: (openaitoken: string, openaiorg: string) => set(() => ({ openaitoken, openaiorg }))
}));


export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore(state => state.setAuth);
  const setOpenAiCredentials = useAuthStore(state => state.setOpenAiCredentials);

  const manageUser = async (session: Session | null) => {
    const data = await api.db.getOpenAIToken()
    setAuth(session);
    data && setOpenAiCredentials(data.token, data.organization);
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
