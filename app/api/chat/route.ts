import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Session, createClient } from '@supabase/supabase-js';
import { Database } from '@/types/db';

export const runtime = 'edge';

const rawCookieEncoder = (rawcookie: string) => {
  const cookie = rawcookie.split(';').map((c) => c.trim());
  const cookieObj: { [key: string]: string } = {};
  cookie.forEach((c) => {
    const [key, value] = c.split('=');
    cookieObj[key] = value;
  });
  return cookieObj;
};

const getUserOpenAICredentials = async (token: string) => {
  const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
  const { data, error } = await supabase.auth.getUser(token);
  if (!data.user || error) {
    throw error;
  }

  const res = await supabase.from('openaitoken').select('*').eq('user_id', data.user.id).limit(1).single();
  return res.data;
};

export async function POST(req: Request) {
  const rawcookie = req.headers.get('cookie');
  const cookie = rawcookie && rawCookieEncoder(rawcookie);
  const encodedauth = (cookie && cookie['auth']) || '';
  const auth = JSON.parse(decodeURIComponent(encodedauth)) as Session;
  const { messages } = await req.json();

  const credentials = await getUserOpenAICredentials(auth.access_token);

  const openai = new OpenAI({ apiKey: credentials?.token! });

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: messages
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
