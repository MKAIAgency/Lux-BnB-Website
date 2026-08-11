import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
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
    icon: '/luxbnb.png',
    shortcut: '/luxbnb.png',
    apple: '/luxbnb.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#241d12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        {children}

      </body>
    </html>
  )
}
