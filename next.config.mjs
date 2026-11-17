/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/content-marketing', destination: '/books', permanent: true }];
  },
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
