import './globals.css'
import type { Metadata } from 'next'
import { WalletProvider } from './context/WalletContext'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'BLCassets',
  description: 'Real Estate NFT Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  )
}

