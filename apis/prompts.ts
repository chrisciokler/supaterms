import { Database } from 'types/db';
import { supabase } from 'config/supabase';
import { PropsQuery } from './assistants';

export type PromptProps = Database['public']['Tables']['prompts']['Row'];
export type PromptInsert = Database['public']['Tables']['prompts']['Insert'];
export type PromptUpdate = Database['public']['Tables']['prompts']['Update'];
export type PromptComment = Database['public']['Tables']['promptscomments']['Row'];

export const GETBYID = async (id: string) => {
  const { data, error } = await supabase.from('prompts').select('context').eq('id', id).eq('active', true).limit(1).single();
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | GET_BY_ID | error:', error);
  }
  return data;
};

export const GETBYUSERID = async (id: string) => {
  const { data, error } = await supabase.from('prompts').select('*, promptslikes(*)').eq('user_id', id).eq('active', true);
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | GET_BY_ID | error:', error);
  }
  return data;
};

export const INSERT = async (prompt: PromptInsert) => {
  const { data, error } = await supabase.from('prompts').insert(prompt).select('*, promptslikes(*)').limit(1).single();
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | INSERT | error:', error);
  }
  return data;
};

export const UPDATE = async (id: string, prompt: PromptUpdate) => {
  console.log('🚀 | file: prompts.ts:21 | UPDATE | prompt:', prompt);
  const { data, error } = await supabase.from('prompts').update(prompt).eq('id', id).select('*, promptslikes(*)');
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | UPDATE | error:', error);
  }
  return data;
};

export const DELETE = async (_id: string) => {
  const { data, error } = await supabase.rpc('delete_prompt', { _id });
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | DELETE | error:', error);
  }
  return data;
};

export interface ListPrompt extends PromptProps {
  usernames: { username: string; avatar_url: string | null };
}
export const LIST = async (query: PropsQuery, page = 0) => {
  const limit = 10;

  const { category = [] } = query;

  const cat =
    category && category.length > 0
      ? ([] as string[])
          .concat(category)
          .map((text) => `categories.cs.{"${text}"}`)
          .join(',')
      : `name.neq.allsklsjsb`;

  let data = null;
  let count = null;
  let error = null;

  const search = query?.search ? ([] as string[]).concat(query.search).join(' ') : '';

  if (search !== '') {
    const q = `${search.split(' ').join(' or ')}`;

    const res = await supabase
      .from('prompts')
      .select('user_id,context,id,likes, comments,categories,name,public,copies,usernames(username, avatar_url), promptslikes(*)', {
        count: 'estimated'
      })
      .eq('public', true)
      .or(cat)
      .textSearch('context', q, { type: 'websearch' })
      .range(page * limit, page * limit + (limit - 1));

    data = res.data;
    count = res.count;
    error = res.error;
  } else {
    const res = await supabase
      .from('prompts')
      .select('user_id,context,id,likes, comments,categories,name,public,copies,usernames(username, avatar_url), promptslikes(*)', {
        count: 'estimated'
      })
      .eq('public', true)
      .or(cat)
      .range(page * limit, page * limit + (limit - 1));

    data = res.data;
    count = res.count;
    error = res.error;
  }

  if (error) {
    console.log('🚀 | file: prompts.ts:7 | GET_BY_ID | error:', error);
  }
  return { data, count } as { data: ListPrompt[] | null; count: number | null };
};

export const CLONE = async (_prompt_id: string) => {
  const { data, error } = await supabase.rpc('clone_prompt', { _prompt_id });
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | CLONE | error:', error);
  }
  return data;
};

export const LIKE = async (_prompt_id: string) => {
  const { data, error } = await supabase.rpc('send_prompt_like', { _prompt_id });
  console.log('🚀 | file: prompts.ts:65 | LIKE | data, error:', data, error);
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | LIKE | error:', error);
  }
  return data;
};

export const UNLIKE = async (_prompt_id: string) => {
  const { data, error } = await supabase.rpc('remove_prompt_like', { _prompt_id });
  console.log('🚀 | file: prompts.ts:65 | LIKE | data, error:', data, error);
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | UNLIKE | error:', error);
  }
  return data;
};

export type PromptCommentProps = Database['public']['Tables']['promptscomments']['Row'];
export type PromptCommentInsertProps = Database['public']['Tables']['promptscomments']['Insert'];
export type PromptCommentUpdateProps = Database['public']['Tables']['promptscomments']['Update'];

export const INSERTCOMMENT = async (comment: PromptCommentInsertProps) => {
  const { data, error } = await supabase.from('promptscomments').insert(comment).select().limit(1).single();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | INSERTCOMMENT | error:', error);
  }
  return data;
};

export const UPDATECOMMENT = async (id: string, comment: PromptCommentUpdateProps) => {
  const { data, error } = await supabase.from('promptscomments').update(comment).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | UPDATECOMMENT | error:', error);
  }
  return data;
};

export const DELETECOMMENT = async (id: string) => {
  const { data, error } = await supabase.from('promptscomments').delete().eq('id', id).select();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | DELETECOMMENT | error:', error);
  }
  return data;
};

export const GETCOMMENTS = async (id: string, page = 0) => {
  const limit = 5;

  const { data, error, count } = await supabase
    .from('promptscomments')
    .select('*, usernames(*)', { count: 'estimated' })
    .eq('prompt_id', id)
    .order('created_at', { ascending: false })
    .range(page * limit, page * limit + (limit - 1));

  if (error) {
    console.log('🚀 | file: assistants.ts:7 | GETCOMMENTS | error:', error);
  }
  return { data, count };
};
