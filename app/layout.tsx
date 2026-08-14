import { Analytics } from '@vercel/analytics/next'
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
  title: 'Maison Doré | Luxury Vacation Homes in Dubai',
  description:
    'Discover an exclusive collection of Dubai\u2019s finest private villas, penthouses and sky residences. Bespoke stays with white-glove concierge service.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <link rel="preload" as="video" href="/videos/hero-dubai.mp4" type="video/mp4" />
        <SiteLoadingScreen />
        <div className="site-content-shell">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
