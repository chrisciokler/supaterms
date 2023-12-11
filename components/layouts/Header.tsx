import { Title, Button, Box, Group, Anchor } from '@mantine/core'
import Link from "next/link";

export const Header = () => (
  <header className='flex w-full items-cente justify-center fixed z-50'>
    <Box display="flex" className='w-full p-4 px-16 md:p-2 justify-between z-50 shadow-xl border-b border-dark-700' style={{ backdropFilter: 'blur(25px)' }}>
      <Link href="/" shallow><Title ml="md" order={3}>SupaTerms</Title></Link>

      <Group>
        <div className='flex md:hidden gap-4'>
          <Link href="/docs" shallow ><Button variant='outline'>Docs</Button></Link>
          <Button variant='outline'>Account</Button>
        </div>

        <Link href="/authenticate" shallow><Button variant="filled">Sign in</Button></Link>
      </Group>
    </Box>
  </header>
)