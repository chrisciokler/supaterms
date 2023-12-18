import { Metadata } from 'next'
import { getSRRAuth } from '../layout'
import { redirect } from 'next/navigation'
import { AppStack } from '@/components/layouts/AppStack'


export const metadata: Metadata = {
  title: 'Terms & Conditions Generator | SupaTerms',
  description: 'AI generated Privacy Policies and Terms & Conditions',
}

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = getSRRAuth()
  if (!auth) {
    redirect('/authenticate')
  }

  return (
    <>
      <AppStack footer={false}>
        {children}
      </AppStack>
    </>
  )
}
