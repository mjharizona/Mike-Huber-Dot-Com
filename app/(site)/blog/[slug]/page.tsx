import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CopyCode from '@/components/CopyCode'
import { getPost, getAllSlugs, formatPostDate, ctaLabel, mfgUrl } from '@/lib/posts'

// Scheduled publishing: published posts are built ahead; a post whose date arrives later renders on its first visit
// (dynamicParams) and refreshes hourly. A post dated in the future returns 404 until its date (lib/posts.ts).
export const revalidate = 3600
export const dynamicParams = true

const SITE = 'https://mikehuber.com'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return { title: 'Post not found', robots: { index: false } }
  const url = `/blog/${post.slug}`
  const image = post.coverImage ?? '/images/og-default.jpg'
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author, url: SITE }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      siteName: 'Mike Huber',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [image] },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const url = `${SITE}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${SITE}${post.coverImage ?? '/images/og-default.jpg'}`,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: post.author, url: `${SITE}/about` },
    publisher: { '@type': 'Person', name: 'Mike Huber', url: SITE },
    isPartOf: { '@type': 'Blog', name: 'Mike Huber Blog', url: `${SITE}/blog` },
  }
  const faq = post.faq.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
    : null
  const toolHref = mfgUrl('/resources', post.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\\u003c') }} />}

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
          <div className="flex flex-wrap items-center gap-3 text-navy-400 text-sm">
            <span className="font-medium text-navy-200">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <article className="post-body prose prose-lg prose-navy max-w-none">
            {post.format === 'md' && post.html ? (
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            ) : (
              <MDXRemote source={post.content} />
            )}
          </article>
          <CopyCode />

          {/* Author box */}
          <aside className="mt-12 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5" aria-label="About the author">
            <Image
              src="/images/Mike-Head-Shot-Self-Portrait.webp"
              alt="Mike Huber"
              width={64}
              height={64}
              className="h-16 w-16 flex-none rounded-full object-cover"
            />
            <p className="text-sm leading-relaxed text-gray-600">
              <Link href="/about" className="font-semibold text-navy-900 hover:underline">Mike Huber</Link> is a
              digital marketing strategist, speaker and trainer, and co-author of{' '}
              <a href={mfgUrl('/book', 'author-box')} className="font-semibold text-navy-700 underline">
                Business Transformation Through AI-Powered Marketing
              </a>.
            </p>
          </aside>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link href="/blog" className="text-navy-700 font-semibold hover:text-navy-900 text-sm">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* End box: two choices */}
      <section className="section bg-gray-50">
        <div className="container-site max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-5 text-center">Where to go from here</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="bg-navy-900 rounded-2xl p-7 text-white flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Work with Mike</p>
              <h3 className="font-heading text-xl font-bold text-white mt-2 mb-2">Want help putting this to work?</h3>
              <p className="text-navy-300 text-sm mb-6">
                Consulting, team training and speaking for businesses and marketing teams.
              </p>
              <Link href={post.cta} className="btn-gold mt-auto justify-center">
                {ctaLabel(post)} →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">Do it yourself</p>
              <h3 className="font-heading text-xl font-bold text-navy-900 mt-2 mb-2">Try the free tools</h3>
              <p className="text-gray-600 text-sm mb-6">
                Calculators, templates and AI prompts from the book, free at the Marketing Field Guide.
                {post.toolName && <> Start with the {post.toolName}.</>}
              </p>
              <a href={toolHref} className="btn-secondary mt-auto justify-center">
                Try the free tools →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
