import * as auth from './auth';
import * as db from './db';

export interface ApiResponse {
  ok: boolean;
  error: any;
  response: any;
}

export const api = {
  db,
  auth
};
