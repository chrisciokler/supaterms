import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { mtheme } from '@/theme/mantine';
import { RouterTransition } from '@/components/layouts/RouterTransition';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { AppInitializer, Auth } from '@/components/layouts/AppInitializer';
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const inter = Inter({ subsets: ['latin'] })

export const getSRRAuth = () => {
  const cookieStore = cookies();
  const cookieAuth = cookieStore.get('auth');
  const auth = (cookieAuth?.value ? JSON.parse(cookieAuth.value) : null) as Auth;
  return auth;
}

export const metadata: Metadata = {
  title: 'SupaTerms',
  description: 'AI generated Privacy Policies and Terms & Conditions',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = getSRRAuth()

  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <AppInitializer auth={auth}>
          <MantineProvider theme={mtheme} defaultColorScheme="dark" >
            <Notifications />
            <ModalsProvider>
              <RouterTransition />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </AppInitializer>
      </body>
    </html>
  )
}
