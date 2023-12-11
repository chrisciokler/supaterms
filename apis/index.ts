/* eslint-disable @typescript-eslint/no-explicit-any */
import * as auth from 'apis/auth';
import * as images from 'apis/images';
import * as error from 'apis/errors';
import * as ai from './ai';
import * as assistants from './assistants';
import * as prompts from './prompts';
import * as logs from './logs';
import * as conversations from './conversations';
import * as chatmessages from './chatmessages';
import * as credits from './credits';
import * as storage from './storage';
import * as feedback from './feedback';
import * as notes from './notes';

export interface ApiResponse {
  ok: boolean;
  error: any;
  response: any;
}

const api = {
  ai,
  logs,
  auth,
  notes,
  images,
  assistants,
  conversations,
  chatmessages,
  feedback,
  storage,
  prompts,
  credits,
  error
};

export default api;
