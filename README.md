![image](https://github.com/user-attachments/assets/353876e5-f16e-4894-b47e-5c0ce3b48a00)# BLCassets - Blockchain Real Estate Asset Management Platform

A decentralized platform for tokenizing and trading real estate assets on the Polygon Amoy testnet. This platform enables users to create, list, and trade real estate assets as digital tokens with blockchain-backed ownership verification.

## Core Features

### 1. Wallet Integration
- MetaMask wallet connection
- Automatic network switching to Polygon Amoy testnet
- Wallet address display and management
- Secure transaction signing

### 2. Asset Management
- Create digital tokens representing real estate assets
- Upload property details and documentation
- View owned assets in personal profile
- Track asset history and ownership

### 3. Marketplace Functionality
- List assets for sale with custom pricing
- Browse available properties
- Real-time price updates
- Secure buying and selling process

### 4. Smart Contract Integration
- Deployed on Polygon Amoy Testnet
- Contract Address: `0xeD29F0874fF49Fb2160CA1602321e948812CD394`
- Automated ownership transfer
- Secure payment handling

SmartContract -
![Screenshot 2024-12-22 100314](https://github.com/user-attachments/assets/a0c0f404-52e3-4ff5-93fd-8e011d8713bc)
 
Snapshots - 
![image](https://github.com/user-attachments/assets/4a9fe3b4-d06e-462f-a620-94115a8a7f93)
![image](https://github.com/user-attachments/assets/8713bb95-994e-4f7b-888e-2632aa501f0a)
![image](https://github.com/user-attachments/assets/db6f5a08-f7bd-41d8-b96e-185915220d82)
![image](https://github.com/user-attachments/assets/89b0a47e-ca58-4e21-bb84-28397c3d6421)
![Screenshot 2024-12-22 100314](https://github.com/user-attachments/assets/a0c0f404-52e3-4ff5-93fd-8e011d8713bc)


## Technical Stack

### Frontend
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS for styling
- Ethers.js for blockchain interaction

### Backend
- MongoDB for data persistence
- Next.js API routes
- IPFS for decentralized storage

### Blockchain
- Polygon Amoy Testnet
- Solidity Smart Contracts
- MetaMask Web3 Provider

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally
- MetaMask browser extension
- Test MATIC tokens from Amoy faucet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/BLCassets.git
cd BLCassets
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS="0xeD29F0874fF49Fb2160CA1602321e948812CD394"
MONGODB_URI="mongodb://localhost:27017/real-estate-nft"
NEXT_PUBLIC_NETWORK_ID="80002"
NEXT_PUBLIC_RPC_URL="https://rpc-amoy.polygon.technology"
```

4. Start MongoDB:
```bash
mongod --dbpath ./data/db
```

5. Run the development server:
```bash
npm run dev
```

## Smart Contract Details

### Contract Functions
```solidity
function createAsset(string _title, string _description, string _location, string _ipfsHash)
function listAsset(uint256 _id, uint256 _price)
function buyAsset(uint256 _id) payable
function getAsset(uint256 _id)
function getAssetsByOwner(address _owner)
```

### Asset Structure
```solidity
struct Asset {
    uint256 id;
    address owner;
    string title;
    string description;
    string location;
    string ipfsHash;
    uint256 price;
    bool isListed;
}
```

## Project Structure
```
my-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes for MongoDB
│   ├── context/           # React context (WalletContext)
│   ├── marketplace/       # Marketplace page
│   ├── create/           # Asset creation page
│   └── profile/          # User profile page
├── components/            # Reusable components
├── contracts/            # Solidity smart contracts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Usage Guide

### 1. Connecting Wallet
- Click "Connect Wallet" button
- Approve MetaMask connection
- Switch to Polygon Amoy testnet if prompted

### 2. Creating an Asset
- Navigate to "Create Token"
- Fill in property details:
  - Title
  - Description
  - Location
  - Size
  - Value (in MATIC)
- Submit and sign transaction

### 3. Listing Assets
- Go to Profile
- Find asset to list
- Click "List for Sale"
- Set price and confirm

### 4. Buying Assets
- Browse Marketplace
- Click "Buy Now" on desired asset
- Confirm transaction in MetaMask
- Wait for blockchain confirmation

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Deployment
```bash
npm run start
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- Developer: [Your Name]
- Email: [Your Email]
- GitHub: [Your GitHub Profile]
