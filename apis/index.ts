import * as auth from './auth';

export interface ApiResponse {
  ok: boolean;
  error: any;
  response: any;
}

export const api = {
  auth
};
