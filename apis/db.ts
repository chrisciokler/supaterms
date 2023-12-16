import { supabase } from '@/configs/supabase';
import { Database } from '@/types/db';

export const insertOpenAIToken = async (organization: string, token: string) => {
  const { data } = await supabase.from('openaitoken').insert({ token, organization }).select();
  if (data) {
    localStorage.setItem('openaitoken', token);
  }
  return data;
};
export const updateOpenAIToken = async (userid: string, organization: string, token: string) => {
  const { data } = await supabase.from('openaitoken').update({ token, organization }).eq('user_id', userid).select();
  if (data) {
    localStorage.setItem('openaitoken', token);
  }
  return data;
};

export const getOpenAIToken = async () => {
  const { data } = await supabase.from('openaitoken').select().limit(1).single();
  return data;
};

export const listDocs = async () => {
  const { data } = await supabase.from('docs').select();
  return data;
};

export const getDoc = async (id: string) => {
  const { data } = await supabase.from('docs').select('id, description, title, type').eq('id', id).single();
  return data;
};

type DocInsertProps = Database['public']['Tables']['docs']['Insert'];
export const insertDoc = async (doc: DocInsertProps) => {
  const { data } = await supabase.from('docs').insert(doc).select();
  return data;
};

export const updateDoc = async (id: string, doc: DocInsertProps) => {
  const { data } = await supabase.from('docs').update(doc).eq('id', id).select();
  return data;
};

export const deleteDoc = async (id: string) => {
  const { data } = await supabase.from('docs').delete().eq('id', id).select();
  return data;
};

export const subscribe = async (email: string) => {
  const { error } = await supabase.from('subscriptions').insert({ email });
  return error;
};
