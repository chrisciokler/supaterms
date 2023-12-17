import { Title, Button, Box, Group, Anchor } from '@mantine/core'
import Link from "next/link";
import { HeaderNav } from '../HeaderNav';

export const Header = () => (
  <header className='flex w-full items-center justify-center fixed z-50'>
    <Box display="flex" className='w-full p-4 px-16 md:p-4 items-center justify-between z-50 shadow-xl' style={{ borderBottom: "1px solid rgb(37 38 43)", backdropFilter: 'blur(25px)' }}>
      <Link href="/" shallow className='no-underline'><Title order={3}>SupaTerms</Title></Link>
      <HeaderNav />
    </Box>
  </header>
)