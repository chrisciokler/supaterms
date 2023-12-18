"use client"
import { Button, Group } from '@mantine/core'
import Link from 'next/link'
import { useAuthStore } from './layouts/AppInitializer'
import { api } from '@/apis'
import { useToggle } from '@mantine/hooks'

export const HeaderNav = () => {
  const auth = useAuthStore(state => state.auth);
  const setAuth = useAuthStore(state => state.setAuth);
  const [loading, toggle] = useToggle([false, true])

  const signOutHandler = async () => {
    toggle(true)
    await api.auth.logout()
    setAuth(null)
    toggle(false)
  }

  return (
    <Group>
      {auth ? (<div className='flex md:hidden gap-4'>
        <Link href="/docs" shallow ><Button variant='outline'>Docs</Button></Link>
        <Link href="/account" shallow ><Button variant='outline'>Account</Button></Link>
        <Button variant='filled' color='red' loading={loading} disabled={loading} onClick={signOutHandler}>Sign out</Button>
        <Button variant='filled' color='red' loading={loading} disabled={loading} onClick={signOutHandler}>Sign out</Button>
      </div>) : (
        <Link href="/authenticate" shallow><Button variant="filled">Sign in</Button></Link>
      )
      }
    </Group>
  )
}