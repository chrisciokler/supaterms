import { supabase } from '@/configs/supabase';

export interface Response {
  error: boolean;
  ok: boolean;
}

export const getSession = async () => {
  const { error, data } = await supabase.auth.getSession();
  console.log('🚀 | file: auth.ts:13 | getSession |  { error, data }:', { error, data });
  if (error) {
    console.log('🚀 | file: auth.ts:14 | getSession | error:', error);
    return null;
  }
  return data.session;
};

export const signUpWithEmail = async ({ email, password }: { email: string; password: string }) => {
  try {
    const exists = await checkIfEmailExists(email);
    console.log('🚀 | file: auth.ts:22 | signUpWithEmail | exists:', exists);
    if (exists) return null;

    const { error, data } = await supabase.auth.signUp({ email, password });
    console.log('🚀 | file: auth.ts:26 | signUpWithEmail | error, data:', error, data);
    if (error) {
      console.log('🚀 | file: auth.ts:44 | sendPasswordRecoveryEmail | error:', error);
    }
    return data.user;
  } catch (e) {
    console.log('🚀 | file: auth.ts:34 | signUpWithEmail | e:', e);
    return null;
  }
};

export const signInWithEmail = async ({ email, password }: { email: string; password: string }) => {
  const exists = await checkIfEmailExists(email);
  if (!exists) return null;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.log('🚀 | file: auth.ts:44 | sendPasswordRecoveryEmail | error:', error);
  }
  return data.session;
};

export const signInWithGoogle = async (url?: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: url }
    });
    if (error === null) return { error: false, ok: true, response: data };
    else return { error: true, ok: false, response: error };
  } catch (e) {
    return { error: true, ok: false, response: e };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('🚀 | file: auth.ts:36 | logout | error:', error);
    return error;
  } catch (e) {
    return e;
  }
};

export const sendPasswordRecoveryEmail = async (email: string) => {
  const exists = await checkIfEmailExists(email);
  if (!exists) return null;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.log('🚀 | file: auth.ts:44 | sendPasswordRecoveryEmail | error:', error);
  }
  return data;
};

export const setNewPassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.log('🚀 | file: auth.ts:44 | GETUSERNAME | error:', error);
  }
  return data.user;
};

/**
 * It checks if an email exists in the database
 * @param {string} email - string - The email address to check
 * @returns { error: false, ok: true, response: { data, exists: email === String(data) } }
 */
export const checkIfEmailExists = async (email: string) => {
  const { data, error } = await supabase.rpc('check_if_email_exists', { _email: email });
  if (error) {
    console.log('🚀 | file: auth.ts:66 | checkIfEmailExists | error:', error);
  }
  return data;
};
