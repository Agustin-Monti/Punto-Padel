// src/app/layout.tsx
import { League_Spartan, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const display = League_Spartan({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata = {
  metadataBase: new URL('https://padel-cocha-sbcy.vercel.app'),
  title: 'Punto Padel',
  description: 'Catálogo de productos de pádel',
  openGraph: {
    title: 'Punto Padel',
    description: 'Catálogo de productos de pádel',
    url: 'https://padel-cocha-sbcy.vercel.app',
    siteName: 'Punto Padel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Punto Padel - Catálogo de pádel',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punto Padel',
    description: 'Catálogo de productos de pádel',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-body antialiased">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}