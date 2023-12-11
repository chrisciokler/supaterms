/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from 'config/supabase';

export const INSERT = async (...data: any) => {
  const res = await supabase.from('logs').insert({ metadata: { log: { ...data } } });
  if (res.error) console.log('🚀 | file: assistants.ts:7 | GET_BY_ID | error:', res.error);

  return res;
};

export const LIST = async () => {
  const { data, error } = await supabase.from('logs').select();
  if (error) console.log('🚀 | file: assistants.ts:7 | GET_BY_ID | error:', error);

  return data;
};
