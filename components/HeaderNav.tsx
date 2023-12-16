"use client"
import { Button, Group } from '@mantine/core'
import Link from 'next/link'
import { useAuthStore } from './layouts/AppInitializer'

export const HeaderNav = () => {
  const auth = useAuthStore(state => state.auth);

  return (
    <Group>
      {auth ? (<div className='flex md:hidden gap-4'>
        <Link href="/docs" shallow ><Button variant='outline'>Docs</Button></Link>
        <Link href="/account" shallow ><Button variant='outline'>Account</Button></Link>
      </div>) : (
        <Link href="/authenticate" shallow><Button variant="filled">Sign in</Button></Link>
      )
      }
    </Group>
  )
}