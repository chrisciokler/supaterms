import { supabase } from 'config/supabase';

export type UploadData = {
  name: string;
  file: File;
};

export const upload = async ({ name, file }: UploadData) => {
  const { data, error } = await supabase.storage.from('feedback').upload(`attachments/${name}`, file);
  console.log('🚀 | file: storage.ts:27 | upload | data, error', { data, error });
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const uploadMany = async (files: File[]) => {
  const timestamp = new Date().getTime().toString();
  const attachments: string[] = [];
  let hasError = null;

  for (const file of files) {
    const { data, error } = await upload({ name: file.name + '.' + timestamp, file });
    if (error) hasError = error;
    if (error) break;
    attachments.push(data.path);
  }

  if (hasError && attachments.length > 0) await deleteFromMessages(attachments);

  return { error: hasError, attachments };
};

export const deleteFromMessages = async (paths: string[]) => {
  console.log('🚀 | file: storage.ts:35 | deleteFromMessages | paths:', paths);
  const { data, error } = await supabase.storage.from('feedback').remove(paths);
  console.log('🚀 | file: storage.ts:19 | deleteFromMessages | { data, error }', { data, error });
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};
