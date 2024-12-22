/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ipfs.io', 
      'gateway.pinata.cloud',
      'images.unsplash.com'
    ],
  },
}

module.exports = nextConfig 