/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from 'apis';
import { CLOUDINARY_APIKEY, CLOUDINARY_APISECRET, CLOUDINARY_URL, PRODUCTS_UPLOAD_PRESET } from 'constants/index';
import { sha1 } from 'hash.js';
import { sendError } from './errors';

export type CloudinaryData = {
  publicId: string;
  secureUrl: string;
};

export interface UploadImageResponse extends ApiResponse {
  response: CloudinaryData;
}

export const uploadImage = async (file: Blob, preset: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    const res = await fetch(`${CLOUDINARY_URL}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = (await res.json()) as any;
    console.log('🚀 | file: images.ts:31 | uploadImage | response', { data });
    if (data.error) {
      await sendError({ title: '🚀 | file: images.ts:65 | uploadImage | e', error: JSON.stringify(data.error) });
      return { ok: false, error: true, response: data.error };
    }
    const response: CloudinaryData = {
      publicId: data.public_id,
      secureUrl: data.secure_url
    };

    return { ok: true, error: null, response };
  } catch (E) {
    const error = JSON.stringify(E);
    await sendError({ error, title: '🚀 | file: images.ts:32 | uploadImage | error' });
    console.error(error);
    const response: CloudinaryData = {
      publicId: '',
      secureUrl: ''
    };
    return { ok: false, error, response };
  }
};

export const deleteImage = async (publicID: string) => {
  try {
    const formData = new FormData();
    const timestamp = String(Date.now());

    const hash = sha1().update(`public_id=${publicID}&timestamp=${timestamp}${CLOUDINARY_APISECRET}`);
    const signature = hash.digest('hex');

    formData.append('public_id', publicID);
    formData.append('signature', signature);
    formData.append('api_key', CLOUDINARY_APIKEY);
    formData.append('timestamp', timestamp);
    const response = await fetch(`${CLOUDINARY_URL}/image/destroy/`, {
      method: 'POST',
      body: formData
    });

    const data = (await response.json()) as any;
    if (data.error) {
      await sendError({ title: '🚀 | file: images.ts:65 | deleteImage | e', error: JSON.stringify(data.error) });
      return { ok: false, error: true, response: data };
    }
    console.log('🚀 | file: images.ts:62 | deleteImage | data', data);
    return { ok: true, error: false, response: data };
  } catch (e) {
    console.log('🚀 | file: images.ts:65 | deleteImage | e', e);
    sendError({ title: '🚀 | file: images.ts:65 | deleteImage | e', error: JSON.stringify(e) });
    return { ok: false, error: true, response: e };
  }
};

export const uploadManyImages = async (files: Blob[]): Promise<string[] | null> => {
  const uploadedImages = await Promise.all(files.map((file) => uploadImage(file, PRODUCTS_UPLOAD_PRESET)));

  const hasError = uploadedImages.some((image) => image.ok === false);
  console.log('🚀 | file: images.ts:75 | uploadManyImages | hasError', hasError);
  if (hasError) {
    await deleteManyImages(uploadedImages.map((image) => image.response.publicId));
    return null;
  }

  const urls = uploadedImages.map((image) => image.response.secureUrl);
  return urls;
};

export const deleteManyImages = async (publicIDs: string[]) => {
  const deletedImages = await Promise.all(publicIDs.map((publicID) => deleteImage(publicID)));
  return deletedImages;
};
