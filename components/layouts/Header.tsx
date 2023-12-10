import { Title, Button, Box } from '@mantine/core'

export const Header = () => (
  <header className='flex w-full items-center fixed bg-dark-800'>
    <Box p="md" w="100%" display="flex" className='justify-between border-b border-dark-700'>
      <Title order={2}>SupaTerms</Title>
      <Button variant="filled">Sign in</Button>
    </Box>
  </header>
)