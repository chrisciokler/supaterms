import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { mtheme } from '@/theme/mantine';
import { RouterTransition } from '@/components/layouts/RouterTransition';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SupaTerms',
  description: 'AI generated Privacy Policies and Terms & Conditions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={mtheme} defaultColorScheme="dark" >
          <RouterTransition />
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
