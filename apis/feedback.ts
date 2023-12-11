import { Database } from 'types/db';
import { sendError } from './errors';
import { supabase } from 'config/supabase';

export type FeedbackProps = Database['public']['Tables']['feedbacks']['Row'];
export type FeedbackInsert = Database['public']['Tables']['feedbacks']['Insert'];

export const INSERT = async (feedback: FeedbackInsert) => {
  const { error, status } = await supabase.from('feedbacks').insert(feedback);
  if (error) {
    console.log('🚀 | file: feedback.ts:11 | INSERT | error:', error);
    sendError({ error, title: '🚀 | file: feedback.ts:8 | INSERT | error' });
  }
  return status;
};
