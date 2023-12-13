import { CreateDocButton } from '@/components/CreateDocButton';
import { Steps } from '@/components/Steps';
import { DocCard, DocCardProps } from '@/components/cards/DocCard';
import { Title, Text, Button, Center, TextInput, Group, Card, Badge, SimpleGrid, Stack } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";

const cardDataTest: DocCardProps[] = [
  {
    id: '1',
    title: "Norway Fjord Adventures",
    type: "Privacy Policy"
  },
  {
    id: '2',
    title: "Norway Fjord Adventures",
    type: "Terms & Conditions"
  }
]

export default function Docs() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-16 md:py-2 md:px-4">

      {/* <section className='flex flex-col min-h-screen items-center justify-center'>
        <h1 className='text-[40px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold text-center'>My Docs is empty.</h1>
        <Button mt="lg" variant='default'>Create new doc</Button>

      </section> */}

      <section className='flex flex-col w-full min-h-screen mt-16'>
        <div className='flex w-full items-center justify-between' >
          <h1 className='text-[40px] text-glow max-w-[750px] md:max-w-[280px] md:text-3xl font-extrabold text-center'>My Docs</h1>
          <CreateDocButton />
        </div>

        <SimpleGrid
          mt="xl"
          cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          {
            cardDataTest.map(i => <DocCard {...i} key={i.id} />)
          }
        </SimpleGrid>

      </section>


    </main >
  )
}
