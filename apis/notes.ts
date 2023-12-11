import { Database } from 'types/db';
import { supabase } from 'config/supabase';
import { sendError } from './errors';

export type NotesProps = Database['public']['Tables']['notes']['Row'];
export type NotesPropsInsert = Database['public']['Tables']['notes']['Insert'];
export type NotesPropsUpdate = Database['public']['Tables']['notes']['Update'];
export type NotebooksProps = Database['public']['Tables']['notebooks']['Row'];
export type NotebooksPropsInsert = Database['public']['Tables']['notebooks']['Insert'];
export type NotebooksPropsUpdate = Database['public']['Tables']['notebooks']['Update'];

export const GET = async (id: string) => {
  const { error, data } = await supabase.from('notes').select().eq('id', id).limit(1).single();
  if (error) {
    console.log('🚀 | file: notes.ts:12 | GET | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | GET | error' });
  }
  return data;
};

export const LIST = async (userid: string) => {
  const { error, data } = await supabase.from('notes').select('id, title').eq('user_id', userid).eq('active', true);
  if (error) {
    console.log('🚀 | file: notes.ts:21 | LIST | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | LIST | error' });
  }
  return data;
};

export const LISTBYNOTEBOOK = async (userid: string, notebook: string) => {
  const { error, data } = await supabase.from('notes').select('id, title').eq('user_id', userid).eq('notebook', notebook).eq('active', true);
  if (error) {
    console.log('🚀 | file: notes.ts:21 | LIST | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | LIST | error' });
  }
  return data;
};

export const INSERT = async (note: NotesPropsInsert) => {
  const { error, data } = await supabase.from('notes').insert(note).select();
  console.log('🚀 | file: notes.ts:23 | INSERT | error:', error);
  if (error) {
    console.log('🚀 | file: notes.ts:31 | INSERT | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | INSERT | error' });
  }
  return data;
};

export const UPDATE = async (id: string, note: NotesPropsUpdate) => {
  const { error, data } = await supabase.from('notes').update(note).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: notes.ts:40 | UPDATE | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | UPDATE | error' });
  }
  return data;
};

export const REMOVE = async (_id: string) => {
  const { data, error } = await supabase.rpc('delete_note', { _id });
  console.log('🚀 | file: notes.ts:36 | REMOVE | error, data:', error, data);
  if (error) {
    console.log('🚀 | file: notes.ts:50 | REMOVE | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | REMOVE | error' });
  }
  return data;
};

export const GETNOTEBOOK = async (id: string, userid: string) => {
  const { error, data } = await supabase.from('notebooks').select('*, notes(id,title)').eq('user_id', userid).eq('id', id).limit(1).single();
  if (error) {
    console.log('🚀 | file: notes.ts:31 | GETMYNOTEBOOKS | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | GETMYNOTEBOOKS | error' });
  }
  return data;
};

export const GETMYNOTEBOOKS = async (userid: string) => {
  const { error, data } = await supabase.from('notebooks').select().eq('user_id', userid);
  if (error) {
    console.log('🚀 | file: notes.ts:31 | GETMYNOTEBOOKS | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | GETMYNOTEBOOKS | error' });
  }
  return data;
};

export const CREATENOTEBOOK = async (notebook: NotebooksPropsInsert) => {
  const { error, data } = await supabase.from('notebooks').insert(notebook).select().limit(1).single();
  if (error) {
    console.log('🚀 | file: notes.ts:31 | CREATENOTEBOOK | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | CREATENOTEBOOK | error' });
  }
  return data;
};

export const UPDATENOTEBOOK = async (id: string, notebook: NotebooksPropsUpdate) => {
  const { error, data } = await supabase.from('notebooks').update(notebook).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: notes.ts:31 | CREATENOTEBOOK | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | CREATENOTEBOOK | error' });
  }
  return data ? data[0] : null;
};

export const DELETENOTEBOOK = async (id: string) => {
  const { error, data } = await supabase.from('notebooks').delete().eq('id', id).select();
  if (error) {
    console.log('🚀 | file: notes.ts:31 | CREATENOTEBOOK | error:', error);
    sendError({ error, title: '🚀 | file: notes.ts:11 | CREATENOTEBOOK | error' });
  }
  return data ? data[0] : null;
};
