"use client"
import { api } from '@/apis';
import { useAuthStore } from '@/components/layouts/AppInitializer';
import { useDidUpdate } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
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
  const token = useAuthStore(state => state.openaitoken);
  const message = chatStore(state => state.message);
  const setMessage = chatStore(state => state.setMessage);

  const { messages, setMessages, append, isLoading, stop, error, data } = useChat({
    api: '/api/chat'
  })

  const generate = async (system: string, user: string) => {
    const id = auth?.user.id || ""

    if (!token) {
      errorNotification("Please set your OpenAI token in the account page.")
      return;
    }

    setMessages([
      { id, role: "system", content: system },
    ])

    await append({ id, role: "user", content: user })
  }

  const errorNotification = (message?: string) => {
    notifications.show({
      color: "red",
      title: 'Failure!!',
      message: message ?? 'Something went wrong. Please try again.',
    })
  }

  useDidUpdate(() => {
    if (messages.length > 0) {
      if (messages[messages.length - 1].role === "assistant") {
        setMessage(messages[messages.length - 1].content)
      }
    }
  }, [messages])

  useDidUpdate(() => {
    if (!isLoading) {
      saveMessage()
    }
  }, [isLoading])

  const saveMessage = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    id && await api.db.updateDoc(id, { content: message })
  }


  useDidUpdate(() => {
    if (error) errorNotification()
  }, [error])

  return { generate, message, isLoading, stop }
}