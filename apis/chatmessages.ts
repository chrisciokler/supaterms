import { Database } from 'types/db';
import { supabase } from 'config/supabase';
import { sendError } from './errors';

export type ChatMessageProps = Database['public']['Tables']['chatmessages']['Row'];
export type ChatMessageInsert = Database['public']['Tables']['chatmessages']['Insert'];
export type ChatMessageUpdate = Database['public']['Tables']['chatmessages']['Update'];

export const GET = async (id: string) => {
  const { error, data } = await supabase.from('chatmessages').select().eq('id', id).limit(1).single();
  if (error) {
    console.log('🚀 | file: chatmessages.ts:12 | GET | error:', error);
    sendError({ error, title: '🚀 | file: chatmessages.ts:11 | GET | error' });
  }
  return data;
};

export const GETBYCONVERSATION = async (conversation_id: string) => {
  const { error, data } = await supabase
    .from('chatmessages')
    .select()
    .eq('conversation_id', conversation_id)
    .order('ordervalue', { ascending: true });
  if (error) {
    console.log('🚀 | file: chatmessages.ts:25 | GETBYCONVERSATION | error:', error);
    sendError({ error, title: '🚀 | file: chatmessages.ts:17 | GETBYCONVERSATION | error' });
  }
  return data;
};

export const INSERT = async (chatmessages: ChatMessageInsert[]) => {
  const { error, data } = await supabase.from('chatmessages').insert(chatmessages).select();
  if (error) {
    console.log('🚀 | file: chatmessages.ts:34 | INSERT | error:', error);
    sendError({ error, title: '🚀 | file: chatmessages.ts:35 | INSERT | error' });
  }
  return data;
};

export const DELETE = async (_id: string) => {
  const { data, error } = await supabase.rpc('delete_chatmessage', { _id });
  if (error) {
    console.log('🚀 | file: chatmessages.ts:7 | DELETE | error:', error);
  }
  return data;
};
