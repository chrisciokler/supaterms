import { supabase } from 'config/supabase';
import { sendError } from './errors';
import { Database } from 'types/db';
import { $auth } from 'store';

export type CreditsProps = Database['public']['Tables']['credits']['Row'];
export type CreditsUpdateProps = Database['public']['Tables']['credits']['Update'];

export const GET = async (userid: string) => {
  const { error, data } = await supabase.from('credits').select().eq('user_id', userid).limit(1).single();
  if (error) {
    console.log('🚀 | file: credits.ts:12 | GET | error:', error);
    sendError({ error, title: '🚀 | file: credits.ts:6 | GET | error' });
  }
  return data;
};

export const ALLOWCOMPLETATION = async () => {
  const id = $auth.value?.user.id;
  if (!id) return null;
  const { error, data } = await supabase.from('credits').select().eq('user_id', id).limit(1).single();
  if (error) {
    console.log('🚀 | file: credits.ts:23 | ALLOWCOMPLETATION | error:', error);
    sendError({ error, title: '🚀 | file: credits.ts:6 | GET | error' });
  }
  if (data) return data?.tokensexpended < data?.currenttokens;
  return data;
};

export const UPDATE = async (creditsdata: CreditsUpdateProps) => {
  const data = await supabase.from('credits').update(creditsdata).eq('user_id', creditsdata.user_id).select();
  console.log('🚀 | file: credits.ts:26 | UPDATE |  data, error:', data);
  if (data.error) sendError({ error: data.error, title: '🚀 | file: credits.ts:6 | UPDATE | error' });
  return data;
};

export const CANCEL_SUBSCRIPTION = async () => {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${$auth.value?.access_token}`
  };

  const res = await fetch(`/api/v1/stripe/subscriptions`, {
    method: 'DELETE',
    headers: headersList
  });

  return await res.json();
};
