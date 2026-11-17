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
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
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

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug)
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

      <section className="inner-hero"><div className="wrap article"><p className="eyebrow">{post.tags.join(' / ')}</p><h1 style={{fontSize:'clamp(42px,5vw,67px)'}}>{post.title}</h1><p className="small muted">{post.author} / <time dateTime={post.date}>{formatPostDate(post.date)}</time> / {post.readingMinutes} min read</p></div></section>
      {/* Content */}
      <section className="section white">
        <div className="wrap article">
          <article className="post-body article-copy">
            {post.format === 'md' && post.html ? (
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            ) : (
              <MDXRemote source={post.content} />
            )}
          </article>
          <CopyCode />

          <aside className="author-box" aria-label="About the author">
            <Image src="/assets/mike-huber-portrait.jpg" alt="Mike Huber" width={64} height={64} />
            <p style={{ margin: 0 }}>
              <Link href="/about" className="text-link">Mike Huber</Link> is a digital marketing strategist, speaker and trainer, and co-author of{' '}
              <a href={mfgUrl('/book', 'author-box')} className="text-link">Business Transformation Through AI-Powered Marketing</a>.
            </p>
          </aside>
          <p style={{ marginTop: 32 }}>
            <Link href="/blog" className="text-link">← Back to the blog</Link>
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap article">
          <p className="eyebrow">Where to go from here</p>
          <div className="endbox">
            <div className="dark-box">
              <p className="eyebrow light">Work with Mike</p>
              <h3>Want help putting this to work?</h3>
              <p>Consulting, team training and speaking for businesses and marketing teams.</p>
              <Link href={post.cta} className="button bronze">
                {ctaLabel(post)}<span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
            <div>
              <p className="eyebrow">Do it yourself</p>
              <h3>Try the free tools</h3>
              <p>
                Calculators, templates and AI prompts from the book, free at the Marketing Field Guide.
                {post.toolName && <> Start with the {post.toolName}.</>}
              </p>
              <a href={toolHref} className="text-link">
                Try the free tools<span className="arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
