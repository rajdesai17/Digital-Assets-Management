'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWallet } from '@/app/context/WalletContext'
import type { Asset } from '@/app/context/WalletContext'
import { DUMMY_ASSETS } from '@/app/context/WalletContext'
import { useToast } from "@/hooks/use-toast"

export default function Marketplace() {
  const { buyAsset, walletAddress } = useWallet()
  const { toast } = useToast()
  const [assets, setAssets] = useState<Asset[]>(
    DUMMY_ASSETS.filter(asset => 
      asset.listed && asset.owner !== walletAddress
    )
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBuy = async (asset: Asset) => {
    try {
      setError(null)
      setIsLoading(true)

      if (!asset.listed) {
        setError('This asset is not listed for sale')
        return
      }

      await buyAsset(asset.id, asset.price!)
      
      // Remove bought asset from marketplace
      setAssets(prevAssets => prevAssets.filter(a => a.id !== asset.id))
      
      toast({
        title: "Success!",
        description: "Asset purchased successfully. Check your profile to view it.",
      })
    } catch (error: any) {
      console.error('Error buying asset:', error)
      setError(error.message || 'Failed to buy asset')
      toast({
        title: "Error",
        description: error.message || 'Failed to buy asset',
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoading(true)
        // Show dummy assets immediately
        setAssets(DUMMY_ASSETS.filter(asset => asset.listed))
      } catch (error) {
        console.error('Error loading assets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAssets()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Real Estate Marketplace</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading assets...</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-8">No assets listed for sale</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset: Asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleBuy(asset)}
                    disabled={asset.owner === walletAddress}
                  >
                    {asset.owner === walletAddress ? 'Owned' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

