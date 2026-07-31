import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/posts'
import { format } from 'date-fns'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-3xl">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-navy-400 text-sm">
            <span className="font-medium text-navy-200">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <article className="prose prose-lg prose-navy max-w-none">
            <MDXRemote source={post.content} />
          </article>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/blog" className="text-navy-700 font-semibold hover:text-navy-900 text-sm">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-50">
        <div className="container-site max-w-3xl">
          <div className="bg-navy-900 rounded-2xl p-8 text-center text-white">
            <h3 className="font-heading text-2xl font-bold mb-3">
              Want help with your digital marketing?
            </h3>
            <p className="text-navy-300 mb-6">
              Mike is available for consulting, speaking engagements, and customized team training.
            </p>
            <Link href="/contact" className="btn-gold">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
