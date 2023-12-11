import { Database } from 'types/db';
import { supabase } from 'config/supabase';
import { CURRENTPATH } from 'components/layouts/RouterTransition';
import { $auth } from 'store';
export type ErrorTrackingInsert = Database['public']['Tables']['errortracking']['Insert'];

export const sendError = async (errortraker: ErrorTrackingInsert) => {
  const pagepath = CURRENTPATH.value;
  const user_id = $auth.value?.user.id;
  const errortrack = { ...errortraker, user_id, pagepath };
  const { status, error } = await supabase.from('errortracking').insert([errortrack]);
  if (error) {
    console.log(error);
    return null;
  }
  return status === 201;
};
