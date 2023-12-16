import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '@/constants';
// import { Database } from 'types/db';

const key = SUPABASE_KEY || '';
export const supabase = createClient(SUPABASE_URL, key);
