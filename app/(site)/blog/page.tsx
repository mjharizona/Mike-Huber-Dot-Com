import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical digital marketing insights from Mike Huber — SEO, content strategy, website optimization, and more.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site">
          <span className="badge mb-4 inline-block">Blog</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Digital Marketing Insights
          </h1>
          <p className="text-navy-300 text-lg max-w-xl">
            Practical strategies, real examples, and actionable takeaways — no fluff.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section bg-gray-50">
        <div className="container-site max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No posts yet — check back soon.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium bg-navy-50 text-navy-700 px-2.5 py-0.5 rounded-full border border-navy-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="font-heading text-xl font-bold text-navy-900 group-hover:text-navy-700 mb-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{post.author}</span>
                        <span>·</span>
                        <time dateTime={post.date}>
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                        </time>
                      </div>
                    </div>
                    <span className="text-navy-400 group-hover:text-navy-700 font-medium text-sm shrink-0 mt-1 md:mt-2">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
