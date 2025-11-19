import type { NextConfig } from 'next'
/** @type {import { 'next' }.NextConfig} */

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
}
module.exports = nextConfig
export default nextConfig
