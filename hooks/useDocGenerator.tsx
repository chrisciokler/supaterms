"use client"
import { useAuthStore } from '@/components/layouts/AppInitializer';
import { useDidUpdate } from '@mantine/hooks';
import { useChat } from 'ai/react';
import { type } from 'os';
import { create } from 'zustand';

type ChatStoreProps = {
  message: string,
  setMessage: (message: string) => void
}

const chatStore = create<ChatStoreProps>((set) => ({
  message: '',
  setMessage: (message: string) => set(() => ({ message })),
}));

export const useDocGenerator = () => {
  const auth = useAuthStore(state => state.auth);
  const message = chatStore(state => state.message);
  console.log('🚀 | file: useDocGenerator.tsx:19 | useDocGenerator | message:', message)
  const setMessage = chatStore(state => state.setMessage);

  const { messages, setMessages, append, isLoading, stop, error } = useChat({
    api: '/api/chat'
  })
  console.log('🚀 | file: useDocGenerator.tsx:25 | useDocGenerator | error:', error)
  console.log('🚀 | file: useDocGenerator.tsx:25 | useDocGenerator | messages:', messages)

  const generate = async (system: string, user: string) => {
    console.log('🚀 | file: useDocGenerator.tsx:27 | generate | user:', user)
    console.log('🚀 | file: useDocGenerator.tsx:27 | generate | system:', system)
    const id = auth?.user.id || ""

    setMessages([
      { id, role: "system", content: system },
    ])

    await append({ id, role: "user", content: user })
  }

  useDidUpdate(() => {
    if (messages.length > 0) {
      setMessage(messages[messages.length - 1].content)
    }
  }, [messages])

  return { generate, message, isLoading, stop }
}