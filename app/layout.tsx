import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Music as a Gift',
  description: 'Give the gift of music!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
