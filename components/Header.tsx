'use client'

import Link from 'next/link'
import { useWallet } from '@/app/context/WalletContext'

export default function Header() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet()

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          BLCassets
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/marketplace" className="text-gray-600 hover:text-blue-500">
            Marketplace
          </Link>
          {isConnected && (
            <>
              <Link href="/create" className="text-gray-600 hover:text-blue-500">
                Create Token
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-blue-500">
                Profile
              </Link>
            </>
          )}
        </nav>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

