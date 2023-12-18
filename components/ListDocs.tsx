"use client"
import { api } from '@/apis';
import { CreateDocButton } from '@/components/CreateDocButton';
import { Steps } from '@/components/Steps';
import { DocCard, DocCardProps } from '@/components/cards/DocCard';
import { Title, Text, Button, Center, TextInput, Group, Card, Badge, SimpleGrid, Stack } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";
import { use, useEffect, useState } from 'react';
import { useAuthStore } from './layouts/AppInitializer';
import { create } from 'zustand';

export type DocsStore = { docs: DocCardProps[], setDocs: (docs: DocCardProps[]) => void }
export const useDocs = create<DocsStore>((set) => ({
  docs: [],
  setDocs: (docs: DocCardProps[]) => set({ docs })
}))

export function ListDocs() {
  const auth = useAuthStore(state => state.auth)
  const { docs, setDocs } = useDocs(state => state)
  const [loading, setLoading] = useState(false)

  const getDocs = async () => {
    const mydocs = await api.db.listDocs()
    if (mydocs && mydocs?.length > 0) {
      const mapped: DocCardProps[] = mydocs.map(i => ({ id: i.id, title: i.title, type: i.type }))
      setDocs(mapped)
    } else {
      setDocs([])
    }
  }

  useEffect(() => {
    getDocs()
  }, [auth])


  return (
    <main className="flex min-h-screen w-full flex-col items-center px-16 md:py-2 md:px-4">


      {
        docs?.length === 0 ? <section className='flex flex-col min-h-screen items-center justify-center'>
          <h1 className='text-[40px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold text-center'>My Docs is empty.</h1>
          <CreateDocButton />

        </section>

          : <section className='flex flex-col w-full min-h-screen mt-16'>
            <div className='flex w-full items-center justify-between' >
              <h1 className='text-[40px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold text-center'>My Docs</h1>
              <CreateDocButton />
            </div>

            <SimpleGrid
              mt="xl"
              cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 3, xl: 4 }}
              spacing={{ base: 10, sm: 'xl' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              {
                docs?.map(i => <DocCard {...i} key={i.id} />)
              }
            </SimpleGrid>
          </section>

      }



    </main >
  )
}
