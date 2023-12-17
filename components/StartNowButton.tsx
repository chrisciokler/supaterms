import { Steps } from '@/components/Steps';
import { SubscriptionForm } from '@/components/forms/SubscriptionForm';
import { Title, Text, Button, Center, TextInput, Anchor } from '@mantine/core'
import { IconAt } from "@tabler/icons-react";
import Link from 'next/link';
import { useAuthStore } from './layouts/AppInitializer';

export function StartNowButton() {
  const auth = useAuthStore(state => state.auth);

  return (<Link href={auth ? "/docs" : "/authenticate"} shallow>
    <Button
      variant="filled"
      mt="lg"
      className='shadow-xl shadow-gray-800'
      style={{ boxShadow: '0 0 150px 48px rgba(75,0,130,0.5)' }}
    >
      Start now - it is free
    </Button>
  </Link>
  )
}
