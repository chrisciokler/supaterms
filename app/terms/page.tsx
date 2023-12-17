
import { MessageArea } from '@/components/MessageArea';
import { TermsOfUseGenerator } from '@/components/TermsOfUseGenerator';
import { Title, Text, Button, Center, TextInput, Group, Card, Badge, SimpleGrid, Stack } from '@mantine/core'
import { IconAt, IconBrain } from "@tabler/icons-react";

export default function Terms() {

  return (
    <main className="flex min-h-screen w-full flex-col items-center px-16 md:py-2 md:px-4">


      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
        className='w-full'
      >
        <Stack className='px-4 w-full h-full overflow-x-hidden overflow-y-auto border-r border-dark-700 mt-20 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]'>
          <TermsOfUseGenerator />
        </Stack>
        <Stack className='flex w-full flex-1 p-4 h-full mt-20 min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-x-hidden overflow-y-auto'>
          {/* <div className='flex flex-col w-full h-full items-center justify-center p-4'>
            <IconBrain size={100} />
            <h1 className='text-2xl mt-2 font-bold text-glow text-center'>Terms of Use Generator</h1>
            <Text size="sm" mt="xs" c="dimmed">Powered by OpenAI</Text>
          </div> */}

          <MessageArea />
        </Stack>


      </SimpleGrid>

    </main >
  )
}
