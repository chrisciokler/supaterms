import { Metadata } from 'next'
import { getSRRAuth } from '../layout'
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
  title: 'Account | SupaTerms',
  description: 'AI generated Privacy Policies and Terms & Conditions',
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = getSRRAuth()
  if (!auth) {
    // redirect('/authenticate')
  }

  return (
    <>
      {children}
    </>
  )
}
