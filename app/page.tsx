'use client'
import Link from 'next/link'
import { useWallet } from '@/app/context/WalletContext'

export default function Home() {
  const { isConnected, connectWallet } = useWallet()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to BLCassets</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A Web3 hackathon project revolutionizing real estate asset management through blockchain technology.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {isConnected ? (
          <div className="flex gap-4">
            <Link href="/create">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                Create Token
              </button>
            </Link>
            <Link href="/marketplace">
              <button className="px-6 py-3 bg-white text-blue-500 border-2 border-blue-500 rounded-lg font-medium hover:bg-blue-50">
                View Marketplace
              </button>
            </Link>
            <Link href="/profile">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                Open Profile
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Blockchain Powered</h2>
          <p className="text-gray-600">Secure asset tokenization using Polygon Amoy testnet.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Decentralized</h2>
          <p className="text-gray-600">No intermediaries, direct peer-to-peer transactions.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Innovation</h2>
          <p className="text-gray-600">Web3 solution for traditional asset management.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Project Overview</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            This project was developed during a Web3 hackathon to demonstrate how blockchain technology 
            can revolutionize traditional real estate asset management.
          </p>
          <p className="text-gray-600">
            Built using Polygon Amoy testnet, the platform showcases secure asset tokenization, 
            decentralized ownership, and transparent transactions.
          </p>
        </div>
      </div>
    </div>
  )
}

