'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useWallet } from '@/app/context/WalletContext'
import type { Asset } from '@/app/context/WalletContext'
import { DUMMY_ASSETS } from '@/app/context/WalletContext'

export default function Profile() {
  const { isConnected, userAssets, walletAddress } = useWallet()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('created')

  useEffect(() => {
    if (!isConnected) {
      setError('Please connect your wallet to view your profile')
      router.push('/')
      return
    }
  }, [isConnected, router])

  if (!isConnected) return null

  const createdAssets = userAssets.filter(asset => asset.creator === walletAddress)
  const ownedAssets = userAssets.filter(asset => 
    asset.owner === walletAddress && !asset.listed
  )
  const listedAssets = DUMMY_ASSETS.filter((asset: Asset) => 
    asset.listed && asset.owner !== walletAddress
  )

  const portfolioValue = ownedAssets.reduce((sum, asset) => 
    sum + (asset.price || 0), 0
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Total Assets</h3>
          <p className="text-3xl font-bold">{ownedAssets.length + listedAssets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Created Assets</h3>
          <p className="text-3xl font-bold">{createdAssets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Owned Assets</h3>
          <p className="text-3xl font-bold">{ownedAssets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Listed Assets</h3>
          <p className="text-3xl font-bold">{listedAssets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold">
            {portfolioValue.toFixed(3)} MATIC
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Real Estate Assets</h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'created' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Created Assets
          </button>
          <button
            onClick={() => setActiveTab('owned')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'owned' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Owned Assets
          </button>
          <button
            onClick={() => setActiveTab('listed')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'listed' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Listed Assets
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'created' && createdAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} type="created" />
          ))}
          {activeTab === 'owned' && ownedAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} type="owned" />
          ))}
          {activeTab === 'listed' && listedAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} type="listed" />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/create">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
              Create New Asset
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface AssetCardProps {
  asset: Asset
  type: 'created' | 'owned' | 'listed'
}

const AssetCard = ({ asset, type }: AssetCardProps) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <Image
      src={asset.image || '/placeholder.svg'}
      alt={asset.title}
      width={400}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{asset.title}</h3>
      <p className="text-gray-600 mb-4">{asset.description}</p>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Location: {asset.location}</span>
        <span className="text-sm text-gray-500">Size: {asset.size}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">{asset.price} MATIC</span>
        {type === 'listed' && (
          <span className="text-green-500 font-medium">Listed</span>
        )}
      </div>
    </div>
  </div>
)

