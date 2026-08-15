import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { SiteLoadingScreen } from '@/components/site-loading-screen'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUX BNB Vacation Homes | Luxury Holiday Rentals in Dubai',
  description:
    'LUX BNB Vacation Homes \u2014 beautiful homes for inspired vacations. A curated collection of premium Dubai apartments and penthouses with attentive guest service.',
  generator: 'v0.app',
  icons: {
    icon: '/d/luxbnb.png',
    shortcut: '/d/luxbnb.png',
    apple: '/d/luxbnb.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbfaf7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <link rel="preload" as="video" href="/d/luxbnb-hero.mp4?v=20260814-otI5MPR" type="video/mp4" />
        <SiteLoadingScreen />
        {children}
      </body>
    </html>
  )
}
