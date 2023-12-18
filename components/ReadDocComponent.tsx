"use client"
import { Loader, Space, Stack } from '@mantine/core'
import { Message } from './MessageArea'
import { useState } from 'react'
import { useEffect } from '@preact-signals/safe-react/react';
import { api } from '@/apis';

export const ReadDocComponent = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<string | null>(null);

  const getcontent = async () => {
    setLoading(true)
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const data = await api.db.getDoc(id || "")
    setContent(data?.content || "")
    setLoading(false)
  }
  useEffect(() => {
    getcontent()
  }, [])

  return (
    <Stack className='flex w-full flex-1 p-4 h-full mt-20 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]'>
      {content && <Message content={content} />}
      {content && <Message content={content} />}
      {loading && <div className='flex flex-1 items-center justify-center'><Loader size={80} /></div>}
      <Space h={200} />
    </Stack>
  )
}