

import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  eslint: {
    
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['th.bing.com', 'www.bing.com','manyavar.scene7.com','fashiongallery1.s3.us-east-1.amazonaws.com','vadhuvara.s3.eu-north-1.amazonaws.com'],
  }
}
 
export default nextConfig
