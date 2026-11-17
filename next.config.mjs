/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'mikehuber.com' }] },
  // Keep scheduled posts available to Netlify's server functions when ISR regenerates a page.
  outputFileTracingIncludes: {
    '/blog': ['./content/posts/**/*'],
    '/blog/[slug]': ['./content/posts/**/*'],
    '/blog/rss.xml': ['./content/posts/**/*'],
    '/sitemap.xml': ['./content/posts/**/*'],
  },
<<<<<<< HEAD
};
export default nextConfig;
=======
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
>>>>>>> ceb7e94abb2a092f0c7d5ff3613819998bdb53bd
