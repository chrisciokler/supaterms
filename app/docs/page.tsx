import { Steps } from '@/components/Steps';
import { Title, Text, Button, Center, TextInput, Group, Card, Badge, SimpleGrid, Stack } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";

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
          <Button variant='default' mt="xs">Create new doc</Button>
        </div>

        <SimpleGrid
          mt="xl"
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack className='w-full' gap="xs">
              <Text fw={500} lineClamp={1}>Norway Fjord Adventures</Text>
              <Badge color="green" variant='light'>Terms & Conditions</Badge>
              <Group w="100%" justify="flex-end" gap="sm" mt="md">
                <Button variant='default'>
                  Delete
                </Button>
                <Button>
                  Edit
                </Button>
              </Group>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack className='w-full' gap="xs">
              <Text fw={500} lineClamp={1}>Norway Fjord Adventures</Text>
              <Badge color="violet" variant='light'>Privacy Policy</Badge>
              <Group w="100%" justify="flex-end" gap="sm" mt="md">
                <Button variant='default'>
                  Delete
                </Button>
                <Button>
                  Edit
                </Button>
              </Group>
            </Stack>
          </Card>
        </SimpleGrid>

      </section>


    </main >
  )
}
