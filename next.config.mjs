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
};
export default nextConfig;
