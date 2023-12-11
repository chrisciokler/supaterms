import { Database } from 'types/db';
import { supabase } from 'config/supabase';

export type AssistantProps = Database['public']['Tables']['assistants']['Row'];
export type AssistantInsert = Database['public']['Tables']['assistants']['Insert'];
export type AssistantUpdate = Database['public']['Tables']['assistants']['Update'];
export type AssistantComment = Database['public']['Tables']['assistantscomments']['Row'];

export const GETBYID = async (id: string) => {
  const { data, error } = await supabase.from('assistants').select('context').eq('id', id).eq('active', true).limit(1).single();
  if (error) {
    console.log('🚀 | file: prompts.ts:7 | GET_BY_ID | error:', error);
  }
  return data;
};

export const GETBYUSERID = async (id: string) => {
  const { data, error } = await supabase
    .from('assistants')
    .select('*, assistantslikes(*)')
    .eq('user_id', id)
    .eq('active', true)
    .order('updated_at', { ascending: false });
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | GET_BY_ID | error:', error);
  }
  return data;
};

export const INSERT = async (assistant: AssistantInsert) => {
  const { data, error } = await supabase.from('assistants').insert(assistant).select('*, assistantslikes(*)').limit(1).single();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | INSERT | error:', error);
  }
  return data;
};

export const UPDATE = async (id: string, assistant: AssistantUpdate) => {
  const { data, error } = await supabase.from('assistants').update(assistant).eq('id', id).select('*, assistantslikes(*)');
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | UPDATE | error:', error);
  }
  return data;
};

export interface ListAssistant extends AssistantProps {
  usernames: { username: string; avatar_url: string | null };
}

export type PropsQuery = {
  category?: string | string[];
  search?: string | string[];
};
export const LIST = async (query: PropsQuery, page = 0) => {
  const limit = 10;
  const { category = [] } = query;

  let data = null;
  let count = null;
  let error = null;

  const cat =
    category && category.length > 0
      ? ([] as string[])
          .concat(category)
          .map((text) => `categories.cs.{"${text}"}`)
          .join(',')
      : `name.neq.allsklsjsb`;

  const search = query?.search ? ([] as string[]).concat(query.search).join(' ') : '';

  if (search !== '') {
    const q = `${search.split(' ').join(' or ')}`;
    const res = await supabase
      .from('assistants')
      .select('user_id,context,id,name,public,copies,likes,categories,comments,copiedfrom,usernames(username,avatar_url), assistantslikes(*)', {
        count: 'estimated'
      })
      .or(cat)
      .eq('public', true)
      .textSearch('context', q, { type: 'websearch' })
      .range(page * limit, page * limit + (limit - 1));

    data = res.data;
    count = res.count;
    error = res.error;
  } else {
    const res = await supabase
      .from('assistants')
      .select('user_id,context,id,name,public,copies,likes,categories,comments,copiedfrom,usernames(username,avatar_url), assistantslikes(*)', {
        count: 'estimated'
      })
      .or(cat)
      .eq('public', true)
      .range(page * limit, page * limit + (limit - 1));

    data = res.data;
    count = res.count;
    error = res.error;
  }

  if (error) {
    console.log('🚀 | file: assistants.ts:91 | LIST | error:', error);
  }
  return { data, count } as { data: ListAssistant[] | null; count: number | null };
};

export const DELETE = async (_id: string) => {
  const { data, error } = await supabase.rpc('delete_assistant', { _id });
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | DELETE | error:', error);
  }
  return data;
};

export const CLONE = async (_assistant_id: string) => {
  const { data, error } = await supabase.rpc('clone_assistant', { _assistant_id });
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | CLONE | error:', error);
  }
  return data;
};

export const LIKE = async (_assistant_id: string) => {
  const { data, error } = await supabase.rpc('send_assistant_like', { _assistant_id });
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | LIKE | error:', error);
  }
  return data;
};

export const UNLIKE = async (_assistant_id: string) => {
  const { data, error } = await supabase.rpc('remove_assistant_like', { _assistant_id });
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | UNLIKE | error:', error);
  }
  return data;
};

export type AssistantCommentProps = Database['public']['Tables']['assistantscomments']['Row'];
export type AssistantCommentInsertProps = Database['public']['Tables']['assistantscomments']['Insert'];
export type AssistantCommentUpdateProps = Database['public']['Tables']['assistantscomments']['Update'];

export const INSERTCOMMENT = async (comment: AssistantCommentInsertProps) => {
  const { data, error } = await supabase.from('assistantscomments').insert(comment).select().limit(1).single();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | INSERTCOMMENT | error:', error);
  }
  return data;
};

export const UPDATECOMMENT = async (id: string, comment: AssistantCommentUpdateProps) => {
  const { data, error } = await supabase.from('assistantscomments').update(comment).eq('id', id).select();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | UPDATECOMMENT | error:', error);
  }
  return data;
};

export const DELETECOMMENT = async (id: string) => {
  const { data, error } = await supabase.from('assistantscomments').delete().eq('id', id).select();
  if (error) {
    console.log('🚀 | file: assistants.ts:7 | DELETECOMMENT | error:', error);
  }
  return data;
};

export const GETCOMMENTS = async (id: string, page = 0) => {
  const limit = 5;

  const { data, error, count } = await supabase
    .from('assistantscomments')
    .select('*, usernames(*)', { count: 'estimated' })
    .eq('assistant_id', id)
    .order('created_at', { ascending: false })
    .range(page * limit, page * limit + (limit - 1));

  if (error) {
    console.log('🚀 | file: assistants.ts:7 | GETCOMMENTS | error:', error);
  }
  return { data, count };
};
