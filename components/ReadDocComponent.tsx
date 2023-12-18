"use client"
import { Stack } from '@mantine/core'
import { Message } from './MessageArea'
import { useState } from 'react'
import { useEffect } from '@preact-signals/safe-react/react';
import { api } from '@/apis';

export const ReadDocComponent = () => {
  const [content, setContent] = useState<string | null>(null);

  const getcontent = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const data = await api.db.getDoc(id || "")
    setContent(data?.content || "")
  }
  useEffect(() => {
    getcontent()
  }, [])

  return (
    <Stack className='flex w-full flex-1 p-4 h-full mt-20 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-x-hidden overflow-y-auto'>
      {content && <Message content={content} />}
    </Stack>
  )
}