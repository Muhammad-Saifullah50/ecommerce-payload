import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here

  typescript: {
    ignoreBuildErrors: true
  }, 
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    ppr: true
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
