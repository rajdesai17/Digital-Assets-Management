'use client'

import React, { createContext, useState, useContext } from 'react'
import { ethers } from 'ethers'
import contractABI from './RealEstateMarket.json'

// Add type declaration for ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

export interface Asset {
  id: number
  title: string
  description: string
  image: string
  location: string
  size: string
  price?: number
  listed: boolean
  owner: string
  creator: string
  createdAt: string
  type: 'building' | 'land' | 'retail'
}

interface WalletContextType {
  isConnected: boolean
  walletAddress: string | null
  userAssets: Asset[]
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  provider: ethers.providers.Web3Provider | null
  contract: ethers.Contract | null
  createAsset: (asset: Omit<Asset, 'id' | 'creator' | 'owner' | 'createdAt'>) => Promise<void>
  listAssetForSale: (id: number, price: number) => Promise<void>
  buyAsset: (id: number, price: number) => Promise<void>
}

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const DUMMY_ASSETS: Asset[] = [
  {
    id: 1,
    title: "Modern Office Building",
    description: "Prime commercial property in the business district with modern amenities",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600",
    location: "Downtown Business District",
    size: "50,000 sq ft",
    price: 0.001,
    listed: true,
    owner: "0x0000000000000000000000000000000000000000",
    creator: "0x0000000000000000000000000000000000000000",
    createdAt: new Date().toISOString(),
    type: "building"
  },
  {
    id: 2,
    title: "Waterfront Development Land",
    description: "Premium waterfront plot perfect for luxury development",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600",
    location: "Coastal District",
    size: "2.5 acres",
    price: 0.002,
    listed: true,
    owner: "0x0000000000000000000000000000000000000000",
    creator: "0x0000000000000000000000000000000000000000",
    createdAt: new Date().toISOString(),
    type: "land"
  },
  {
    id: 3,
    title: "Industrial Warehouse Complex",
    description: "Large industrial warehouse with loading docks and storage facilities",
    image: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&h=600",
    location: "Industrial Park",
    size: "75,000 sq ft",
    price: 0.0015,
    listed: true,
    owner: "0x0000000000000000000000000000000000000000",
    creator: "0x0000000000000000000000000000000000000000",
    createdAt: new Date().toISOString(),
    type: "building"
  },
  {
    id: 4,
    title: "Residential Development Plot",
    description: "Ready-to-develop land in growing residential area",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=600",
    location: "Suburban District",
    size: "1.8 acres",
    price: 0.0008,
    listed: true,
    owner: "0x0000000000000000000000000000000000000000",
    creator: "0x0000000000000000000000000000000000000000",
    createdAt: new Date().toISOString(),
    type: "land"
  },
  {
    id: 5,
    title: "Luxury Retail Space",
    description: "High-end retail property in premium shopping district",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600",
    location: "Shopping District",
    size: "15,000 sq ft",
    price: 0.0025,
    listed: true,
    owner: "0x0000000000000000000000000000000000000000",
    creator: "0x0000000000000000000000000000000000000000",
    createdAt: new Date().toISOString(),
    type: "building"
  }
];

// Add this interface near the top with other interfaces
interface ContractEvent {
  event: string;
  args?: {
    id?: {
      toNumber: () => number;
    };
  };
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [userAssets, setUserAssets] = useState<Asset[]>([])

  const fetchUserAssets = async (address: string) => {
    try {
      const response = await fetch(`/api/assets?owner=${address}`)
      const data = await response.json()
      if (data.success) {
        // Combine real assets with dummy ones
        const realAssets = data.assets || []
        setUserAssets([...DUMMY_ASSETS, ...realAssets])
      }
    } catch (error) {
      console.error('Error fetching assets:', error)
      // If API fails, still show dummy assets
      setUserAssets(DUMMY_ASSETS)
    }
  }

  const switchToAmoyTestnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${Number(process.env.NEXT_PUBLIC_NETWORK_ID).toString(16)}` }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${Number(process.env.NEXT_PUBLIC_NETWORK_ID).toString(16)}`,
              chainName: 'Polygon Amoy Testnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL!],
              blockExplorerUrls: ['https://www.oklink.com/amoy'],
            },
          ],
        })
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await switchToAmoyTestnet()
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress!, contractABI.abi, signer)
        
        setProvider(provider)
        setContract(contract)
        setIsConnected(true)
        const address = await signer.getAddress()
        setWalletAddress(address)

        await fetchUserAssets(address)
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress(null)
    setProvider(null)
    setContract(null)
    setUserAssets([])
  }

  const createAsset = async (asset: Omit<Asset, 'id' | 'creator' | 'owner' | 'createdAt'>) => {
    if (!contract || !walletAddress) {
      throw new Error('Wallet not connected')
    }

    try {
      const tx = await contract.createAsset(
        asset.title,
        asset.description,
        asset.location,
        asset.image,
        { gasLimit: 500000 }
      )

      const receipt = await tx.wait()
      if (!receipt.status) {
        throw new Error('Transaction failed')
      }

      // Update this line with proper typing
      const event = receipt.events?.find((e: ContractEvent) => e.event === 'AssetCreated')
      const assetId = event?.args?.id?.toNumber() || Date.now()

      // Prepare asset data
      const newAsset = {
        ...asset,
        id: assetId,
        creator: walletAddress,
        owner: walletAddress,
        createdAt: new Date().toISOString(),
        listed: false
      }

      // Save to MongoDB
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset: newAsset,
          walletAddress
        })
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error('Failed to save asset data')
      }

      // Update local state
      setUserAssets(prevAssets => [...prevAssets, newAsset])
    } catch (error: any) {
      console.error('Error creating asset:', error)
      throw new Error('Failed to create asset: ' + (error.message || 'Unknown error'))
    }
  }

  const listAssetForSale = async (id: number, price: number) => {
    if (!contract || !walletAddress) {
      throw new Error('Wallet not connected')
    }

    try {
      const tx = await contract.listAsset(id, ethers.utils.parseEther(price.toString()))
      await tx.wait()

      setUserAssets(prevAssets => 
        prevAssets.map(asset => 
          asset.id === id 
            ? { ...asset, listed: true, price } 
            : asset
        )
      )
    } catch (error) {
      console.error('Error listing asset:', error)
      throw error
    }
  }

  const buyAsset = async (id: number, price: number): Promise<void> => {
    if (!contract || !walletAddress) {
      throw new Error('Wallet not connected')
    }

    try {
      // Convert price to Wei and add some buffer for gas
      const priceInWei = ethers.utils.parseEther((price * 1.1).toString()) // Add 10% buffer

      // First check if we have enough balance
      const balance = await provider?.getBalance(walletAddress)
      if (balance && balance.lt(priceInWei)) {
        throw new Error('Insufficient balance')
      }

      // Execute the purchase
      const tx = await contract.buyAsset(id, {
        value: priceInWei,
        gasLimit: 500000 // Increased gas limit
      })

      // Wait for confirmation
      const receipt = await tx.wait()
      if (!receipt.status) {
        throw new Error('Transaction failed')
      }

      // Update local state after successful purchase
      setUserAssets(prevAssets => {
        const boughtAsset = DUMMY_ASSETS.find(a => a.id === id)
        if (!boughtAsset) return prevAssets

        const newAsset = {
          ...boughtAsset,
          owner: walletAddress,
          listed: false,
          price: price
        }

        // Add to MongoDB
        fetch('/api/assets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            asset: newAsset,
            walletAddress
          })
        }).catch(console.error)

        return [...prevAssets, newAsset]
      })
    } catch (error: any) {
      console.error('Error details:', error)
      if (error.data?.message) {
        throw new Error(error.data.message)
      } else if (error.message.includes('user rejected')) {
        throw new Error('Transaction rejected by user')
      } else {
        throw new Error('Failed to buy asset: ' + (error.message || 'Unknown error'))
      }
    }
  }

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      userAssets,
      connectWallet,
      disconnectWallet,
      provider,
      contract,
      createAsset,
      listAssetForSale,
      buyAsset
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

