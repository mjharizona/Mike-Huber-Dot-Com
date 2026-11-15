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
    // Blog posts are read from content/posts at build time and again when a page revalidates (hourly, for scheduled
    // posts), so the markdown files must travel with the server functions.
    outputFileTracingIncludes: {
      '/blog': ['./content/posts/**/*'],
      '/blog/[slug]': ['./content/posts/**/*'],
      '/blog/rss.xml': ['./content/posts/**/*'],
      '/sitemap.xml': ['./content/posts/**/*'],
    },
  },
}

export default nextConfig
