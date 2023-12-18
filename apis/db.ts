import { supabase } from '@/configs/supabase';
import { Database } from '@/types/db';

export const insertOpenAIToken = async (organization: string, token: string) => {
  const { data, error } = await supabase.from('openaitoken').insert({ token, organization }).select();
  console.log('🚀 | file: db.ts:6 | insertOpenAIToken | error:', error);
  if (data) {
    localStorage.setItem('openaitoken', token);
  }
  return data;
};
export const updateOpenAIToken = async (userid: string, organization: string, token: string) => {
  const { data, error } = await supabase.from('openaitoken').update({ token, organization }).eq('user_id', userid).select();
  console.log('🚀 | file: db.ts:13 | updateOpenAIToken | error:', error);
  if (data) {
    localStorage.setItem('openaitoken', token);
  }
  return data;
};

export const getOpenAIToken = async () => {
  const { data, error } = await supabase.from('openaitoken').select();
  console.log('🚀 | file: db.ts:22 | getOpenAIToken | error:', error);
  return data ? data[0] : null;
};

export const listDocs = async () => {
  const { data, error } = await supabase.from('docs').select('id, description, title, type');
  console.log('🚀 | file: db.ts:28 | listDocs | error:', error);
  return data;
};

export const getDoc = async (id: string) => {
  const { data, error } = await supabase.from('docs').select('id, description, title, type, content').eq('id', id).single();
  console.log('🚀 | file: db.ts:34 | getDoc | error:', error);
  return data;
};

type DocInsertProps = Database['public']['Tables']['docs']['Insert'];
export const insertDoc = async (doc: DocInsertProps) => {
  const { data, error } = await supabase.from('docs').insert(doc).select().limit(1).single();
  console.log('🚀 | file: db.ts:41 | insertDoc | error:', error);
  return data;
};

type DocUpdateProps = Database['public']['Tables']['docs']['Update'];
export const updateDoc = async (id: string, doc: DocUpdateProps) => {
  const { data, error } = await supabase.from('docs').update(doc).eq('id', id).select();
  console.log('🚀 | file: db.ts:47 | updateDoc | error:', error);
  return data;
};

export const deleteDoc = async (id: string) => {
  const { data, error } = await supabase.from('docs').delete().eq('id', id).select();
  console.log('🚀 | file: db.ts:53 | deleteDoc | error:', error);
  return data;
};

export const subscribe = async (email: string) => {
  const { error } = await supabase.from('subscriptions').insert({ email });
  return error;
};
