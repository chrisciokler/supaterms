import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { mtheme } from '@/theme/mantine';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

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
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={mtheme} defaultColorScheme='dark'>
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
