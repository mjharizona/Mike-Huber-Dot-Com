/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mikehuber.com',
      },
    ],
    // Allow local images from /public
    unoptimized: false,
  },
  // Enable MDX
  experimental: {
    mdxRs: true,
  },
}

export default nextConfig
