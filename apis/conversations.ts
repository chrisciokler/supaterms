import { Database } from 'types/db';
import { supabase } from 'config/supabase';
import { sendError } from './errors';

export type ConversationProps = Database['public']['Tables']['conversations']['Row'];
export type ConversationInsert = Database['public']['Tables']['conversations']['Insert'];
export type ConversationUpdate = Database['public']['Tables']['conversations']['Update'];

export const GET = async (id: string) => {
  const { error, data } = await supabase.from('conversations').select().eq('id', id).limit(1).single();
  if (error) {
    console.log('🚀 | file: conversations.ts:12 | GET | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:11 | GET | error' });
  }
  return data;
};

export const MY = async (user_id: string, assistant_id: string) => {
  let data = null;
  let error = null;
  if (assistant_id === '1') {
    const res = await supabase.from('conversations').select().eq('user_id', user_id).eq('saved', true).order('updated_at', { ascending: false });
    data = res.data;
    error = res.error;
  } else {
    const res = await supabase
      .from('conversations')
      .select()
      .eq('assistant_id', assistant_id)
      .eq('saved', true)
      .order('updated_at', { ascending: false });
    data = res.data;
    error = res.error;
  }

  if (error) {
    console.log('🚀 | file: conversations.ts:32 | MY | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:17 | MY | error' });
  }
  return data;
};

export const CHANGENAME = async (id: string, name: string) => {
  const { error, data } = await supabase.from('conversations').update({ name }).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: conversations.ts:41 | CHANGENAME | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:23 | CHANGENAME | error' });
  }
  return data;
};

export const REMOVE = async (id: string) => {
  const { error, data } = await supabase.from('conversations').delete().eq('id', id).select();
  if (error) {
    console.log('🚀 | file: conversations.ts:50 | REMOVE | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:29 | REMOVE | error' });
  }
  return data;
};

export const INSERT = async (conversation: ConversationInsert) => {
  const { error, data } = await supabase.from('conversations').insert(conversation).select().limit(1).single();
  if (error) {
    console.log('🚀 | file: conversations.ts:59 | INSERT | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:35 | INSERT | error' });
  }
  return data;
};
export const SAVE = async (id: string) => {
  const { error, data } = await supabase.from('conversations').update({ saved: true }).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: conversations.ts:67 | SAVE | error:', error);
    sendError({ error, title: '🚀 | file: conversations.ts:35 | SAVE | error' });
  }
  return data;
};
