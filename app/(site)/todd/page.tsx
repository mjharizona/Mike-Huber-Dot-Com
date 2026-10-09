import type { Metadata } from 'next'
import ToddResponseForm from '@/components/ToddResponseForm'

// Unlisted page for Todd Hartley. Not linked from the menu, footer or sitemap,
// and search engines are told not to index it.
export const metadata: Metadata = {
  title: 'For Todd Hartley',
  description: 'Three quick asks for the second edition of Business Transformation.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const downloads = [
  { href: '/todd/hartley-review-pack.pdf', label: 'Review pack (PDF, 4 pages)', note: 'The three asks, ready to print or mark up.' },
  { href: '/todd/hartley-review-pack-audio.mp3', label: 'Review pack (audio, about 3½ minutes)', note: 'The same pack, read aloud.' },
  { href: '/review/field-guide-09-video-review-draft.pdf', label: 'Field Guide 09: Video (review draft)', note: 'The video chapter as its own stand-alone field guide, 19 pages.' },
  { href: '/review/chapter-11-video-review-draft.pdf', label: 'Chapter 11: Video (review draft)', note: 'Just the video chapter, as it sits in the book, 16 pages.' },
  { href: '/review/business-transformation-2e-review-draft.pdf', label: 'The whole book (latest review draft)', note: 'All 25 chapters, about 410 pages and 15 MB.' },
]


export default function ToddPage() {
  return (
    <>
      {/* Hero with audio message */}
      <section className="bg-navy-900 text-white section">
        <div className="container-site grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="badge mb-4 inline-block">For Todd Hartley</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Three quick asks for the new book
            </h1>
            <p className="text-navy-200 text-xl leading-relaxed">
              Thanks for taking a look, Todd. This page is short on purpose. Press play for a quick
              message from Mike, then answer right on this page.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5">
            <img
              src="/todd/mike-portrait.jpg"
              alt="Illustrated portrait of Mike Huber"
              width={900}
              height={802}
              className="w-full rounded-xl mb-4"
            />
            <p className="font-semibold text-white mb-2">A 28-second message from Mike</p>
            <audio controls preload="metadata" className="w-full" src="/todd/mike-to-todd.mp3">
              Your browser can&rsquo;t play this audio.
            </audio>
            <details className="mt-3 text-navy-200">
              <summary className="cursor-pointer text-sm underline">Read it instead</summary>
              <p className="mt-2 text-base leading-relaxed">
                Hi Todd, Mike here. Hey, I&rsquo;m finishing a second edition of my book that I published in
                2023, and quite frankly, the video chapter could use your touch. I have three quick asks for
                you: a real example or two, a short endorsement for the book, and your OK to name you in the
                book. Everything on this page, in text and audio, is all you need. Appreciate your help.
                Thanks, my friend.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl text-lg leading-relaxed text-gray-800">
          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">The three asks</h2>
          <ol className="list-decimal pl-6 space-y-3 mb-8">
            <li>
              <strong>A real-world example or two</strong> for our video chapter. We drafted them
              from your public bio, so you don&rsquo;t start from scratch. Fix anything that&rsquo;s wrong.
            </li>
            <li>
              <strong>A short endorsement</strong> for the new edition. Your 2023 endorsement is
              below to start from, plus three short drafts. Pick one, change it, or write your own.
            </li>
            <li>
              <strong>Your OK</strong> to name you, and Tony Robbins&rsquo; team, in the book.
            </li>
          </ol>

          <div className="card mb-8">
            <h3 className="font-heading text-xl font-bold text-navy-900 mb-3">The easiest ways to answer</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong><a href="#answer" className="underline">Answer on this page</a>:</strong> tick boxes, edit our drafts, or record a voice note, then press Send.</li>
              <li>Reply <strong>&ldquo;approved&rdquo;</strong> to Mike&rsquo;s email, or mark up the PDF.</li>
              <li>Send Mike a <strong>voice memo</strong>. We&rsquo;ll write it up and send it back for your OK.</li>
              <li>Or grab <strong>15 minutes</strong> with Mike by phone.</li>
            </ul>
            <p className="mt-4 font-semibold text-navy-900">Nothing goes in the book until you approve it, word for word.</p>
          </div>

          <div className="mb-12" />

          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">What Chapter 11 covers</h2>
          <p className="mb-4">
            <em>Business Transformation Through AI-Powered Marketing</em> is the second edition of
            our 2023 book. It&rsquo;s a field guide for small businesses and marketing teams: read
            it, fill in the pages, then use AI to turn the answers into a plan. The video chapter
            covers:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Why video:</strong> it&rsquo;s the easiest content to consume, and it builds trust fast.</li>
            <li><strong>Video for every stage:</strong> which videos fit awareness, consideration, decision, retention and advocacy.</li>
            <li><strong>Producing video:</strong> storyboards, b-roll, who goes on camera, and where AI helps.</li>
            <li><strong>Getting video found:</strong> titles, descriptions, chapters, and showing up in AI answers.</li>
            <li><strong>Measuring video:</strong> the numbers that matter, and a video plan.</li>
          </ul>
          <p className="mb-12">
            The chapter covers marketing video well. It&rsquo;s thin on <strong>video inside the
            sales process</strong>: short personal videos before a meeting, after a call, or walking
            a buyer through a proposal. That&rsquo;s your expertise. So we drafted a short new
            section, &ldquo;Video That Speeds Up the Sale,&rdquo; built around your examples.
          </p>

          <h2 id="answer" className="font-heading text-3xl font-bold text-navy-900 mb-2">Answer right here</h2>
          <p className="text-gray-500 mb-6">Our drafts are below, ready for you to change. Square brackets mark the spots only you can fill in.</p>
          <ToddResponseForm />

          <div className="mt-16" />
          <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">Downloads</h2>
          <ul className="space-y-4 mb-6">
            {downloads.map((d) => (
              <li key={d.href} className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-900">{d.label}</p>
                  <p className="text-gray-600 text-base">{d.note}</p>
                </div>
                <a href={d.href} download className="btn-primary shrink-0">Download</a>
              </li>
            ))}
          </ul>
          <audio controls preload="none" className="w-full mb-4" src="/todd/hartley-review-pack-audio.mp3">
            Your browser can&rsquo;t play this audio. Use the download above.
          </audio>
          <p className="text-lg mt-8">Thanks, my friend. &mdash; Mike</p>
        </div>
      </section>
    </>
  )
}
