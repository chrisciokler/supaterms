import { Metadata } from 'next'
import { getSRRAuth } from '../layout'
import { redirect } from 'next/navigation'
import { AppStack } from '@/components/layouts/AppStack'


export const metadata: Metadata = {
  title: 'Login | SupaTerms',
  description: 'AI generated Privacy Policies and Terms & Conditions',
}

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = getSRRAuth()
  if (auth) {
    redirect('/')
  }

  return (
    <>
      <AppStack>
        {children}
      </AppStack>
    </>
  )
}
