/* eslint-disable prettier/prettier */
import { AI_EDGE_FUNCTION_URL } from '@constants';
import { CreateEmbeddingResponse } from 'openai';
import { $auth, $currentassistant, $currentconversation, ChatMessageProps } from 'store';
import * as e from './errors';
import { createCodeTestAssistant, createCodeTranslationPrompt, createCodingCommentAssistant } from 'lib/prompsgeneration';
import endent from 'endent';
import { $usegpt4 } from 'components/Chat/state';
import { $fileimageurl } from 'components/Chat/ChatInput';

export interface ChatGPTPromptRes {
  error: object | null;
  data: ChatGPTData | null;
}

export interface ChatGPTData {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: ChatGPTUsage;
  choices: ChatGPTChoice[];
}

export interface ChatGPTChoice {
  message: ChatGPTMessage;
  finish_reason: string;
  index: number;
}

export type Role = 'user' | 'system' | 'assistant';

export interface ChatGPTMessage {
  role: Role;
  content: string;
}

export interface ChatGPTUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type ChatGPTPromptReq = {
  newid: string;
  isregenerated: boolean;
  chat: ChatMessageProps[];
  user: ChatMessageProps;
};

export const STREAMAUTOCOMPLETION = async (req: ChatGPTPromptReq, controller: AbortController) => {
  const headersList = {
    'Accept': '*/*',
    'Authorization': `Bearer ${$auth.value?.access_token}`,
    'Content-Type': 'application/json'
  };

  const system = ($currentassistant.value.context || '') + 'Always format the response to Markdown';

  const conversation_id = $currentconversation.value?.id || null;

  const bodyContent = JSON.stringify({
    ...req,
    system,
    imageurl: $fileimageurl.value,
    gpt4: $usegpt4.value,
    conversation_id
  });

  try {
    const res = await fetch(`${AI_EDGE_FUNCTION_URL}/api/v2/chatstream`, {
      method: 'POST',
      signal: controller.signal,
      body: bodyContent,
      headers: headersList
    });

    $fileimageurl.value = null;
    return res;
  } catch (error) {
    console.log('🚀 | file: ai.ts:95 | STREAMAUTOCOMPLETION | error:', error);
    return { ok: false, body: null, error };
  }
};

export const AUTOCOMPLETION16K = async (req: { user: string; system: string }, controller: AbortController) => {
  const headersList = {
    'Accept': '*/*',
    'Authorization': `Bearer ${$auth.value?.access_token}`,
    'Content-Type': 'application/json'
  };

  const bodyContent = JSON.stringify({
    ...req
  });

  try {
    return await fetch(`${AI_EDGE_FUNCTION_URL}/api/v2/tools/chatstream16k`, {
      method: 'POST',
      signal: controller.signal,
      body: bodyContent,
      headers: headersList
    });
  } catch (error) {
    console.log('🚀 | file: ai.ts:95 | TEXTFORMATTER | error:', error);
    return { ok: false, body: null, error };
  }
};

export const AUTOCOMPLETION = async (req: { user: string; system: string; imageurl?: string | null }, controller: AbortController) => {
  const headersList = {
    'Accept': '*/*',
    'Authorization': `Bearer ${$auth.value?.access_token}`,
    'Content-Type': 'application/json'
  };

  const bodyContent = JSON.stringify({
    ...req
  });

  try {
    return await fetch(`${AI_EDGE_FUNCTION_URL}/api/v2/tools/chatstream`, {
      method: 'POST',
      signal: controller.signal,
      body: bodyContent,
      headers: headersList
    });
  } catch (error) {
    console.log('🚀 | file: ai.ts:95 | TEXTFORMATTER | error:', error);
    return { ok: false, body: null, error };
  }
};

export const TEXTFORMATTER = async (req: { user: string; system: string }, controller: AbortController) => {
  const system = `You are text formatting tool. You will receive a text and your only job is to follow the rules below, no more, no less
    
    RULES
    ${req.system}

    You sould act as a machine and never put yourself in the response.
    `;

  return await AUTOCOMPLETION({ ...req, system }, controller);
};

export const AUDIOWHISPER = async (body: FormData) => {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${$auth.value?.access_token}`
  };

  const res = await fetch(`${AI_EDGE_FUNCTION_URL}/api/v1/whisper`, {
    method: 'POST',
    body,
    headers: headersList
  });

  return await res.json();
};

interface EmbeddingResponse extends CreateEmbeddingResponse {
  error: null;
}
export const EMBEDDINGS = async (body: { content: string }) => {
  const headersList = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${$auth.value?.access_token}`
  };

  const res = await fetch(`${AI_EDGE_FUNCTION_URL}/api/v1/embeddings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headersList
  });

  return (await res.json()) as EmbeddingResponse | { error: unknown; data: null };
};

export type CategoriesResponse =
  | {
      error: null;
      data: string[];
    }
  | {
      error: unknown;
      data: string[];
    };

export const CATEGORIZE = async (prompt: string) => {
  const headersList = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${$auth.value?.access_token}`
  };

  try {
    const response = await fetch(`${AI_EDGE_FUNCTION_URL}/api/v1/categorize`, {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: headersList
    });

    const { data, error } = (await response.json()) as CategoriesResponse;
    if (error) e.sendError({ error: JSON.stringify({ error }), title: '🚀 | file: ai.ts:155 | CATEGORIZE | error' });
    return data;
  } catch (error) {
    e.sendError({ error: JSON.stringify({ error }), title: '🚀 | file: ai.ts:155 | CATEGORIZE | error' });
    return ['other'];
  }
};

export const SITEANALYZER = async (req: { url: string; system: string }, controller: AbortController) => {
  const headersList = {
    'Accept': '*/*',
    'Authorization': `Bearer ${$auth.value?.access_token}`,
    'Content-Type': 'application/json'
  };

  const system = endent`
  You will receive the html, css and text content of a site. 
  Just do the task, do not mention anything about the type or structure of the data submitted.

  Task:
  ${req.system}

  `;

  const bodyContent = JSON.stringify({
    ...req,
    system
  });

  try {
    return await fetch(`${AI_EDGE_FUNCTION_URL}/api/v2/tools/siteanalyzer`, {
      method: 'POST',
      signal: controller.signal,
      body: bodyContent,
      headers: headersList
    });
  } catch (error) {
    console.log('🚀 | file: ai.ts:95 | TEXTFORMATTER | error:', error);
    return { ok: false, body: null, error };
  }
};

export const CODETRANSLATION = async (req: { inputLanguage: string; outputLanguage: string; inputCode: string }, controller: AbortController) => {
  const { system, user } = createCodeTranslationPrompt(req.inputLanguage, req.outputLanguage, req.inputCode);
  return await AUTOCOMPLETION({ system, user }, controller);
};
export const CODETEST = async (req: { inputLanguage: string; inputCode: string }, controller: AbortController) => {
  const { system, user } = createCodeTestAssistant(req.inputLanguage, req.inputCode);
  return await AUTOCOMPLETION({ system, user }, controller);
};
export const CODECOMMENTS = async (req: { inputLanguage: string; inputCode: string }, controller: AbortController) => {
  const { system, user } = createCodingCommentAssistant(req.inputLanguage, req.inputCode);
  return await AUTOCOMPLETION({ system, user }, controller);
};
