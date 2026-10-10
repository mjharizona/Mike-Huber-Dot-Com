import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information mikehuber.com collects, how it is used, and how to have it deleted.',
}

const UPDATED = 'October 10, 2026'

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-2xl font-bold text-navy-900 mt-10 mb-3">{children}</h2>
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-900 text-white section">
        <div className="container-site max-w-3xl">
          <span className="badge mb-4 inline-block">Privacy</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Privacy policy</h1>
          <p className="text-navy-200 text-lg">Plain English: what this site collects, why, and how to have it deleted. Last updated {UPDATED}.</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-site max-w-3xl text-lg leading-relaxed text-gray-800">
          <p>
            This site is run by Mike Huber (&ldquo;I,&rdquo; &ldquo;me&rdquo;). I keep it simple: I only collect what you
            choose to send me, I use it to answer you, and I never sell it.
          </p>

          <H>What I collect</H>
          <p className="mb-3"><strong>When you use the contact form:</strong> your name, email, and anything else you fill in, such as phone, company and your message.</p>
          <p className="mb-3">
            <strong>When you use the free audit:</strong> your website address, your business name, what you sell, where you
            serve, your answers to the audit questions, your budget range and timeline. If you ask for the full report, also
            your name and email.
          </p>
          <p>
            <strong>Automatically:</strong> like almost every website, my hosting provider keeps standard server logs, such as
            IP address, browser type and the pages requested, to keep the site running and secure. This site doesn&rsquo;t use
            advertising cookies, tracking pixels or third-party analytics.
          </p>

          <H>How I use it</H>
          <ul className="list-disc pl-6 space-y-2">
            <li>To answer your message or send the audit report you asked for.</li>
            <li>To follow up about your inquiry or audit, if you agreed to that. You can tell me to stop at any time.</li>
            <li>To keep the site secure and stop spam.</li>
          </ul>
          <p className="mt-3">I don&rsquo;t add you to a mailing list, and I don&rsquo;t sell, rent or trade your information.</p>

          <H>The free audit, in detail</H>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Website scan.</strong> The audit reads the public home page of the website you enter, the same page any visitor can see. It doesn&rsquo;t log in or look at anything private.</li>
            <li><strong>Speed test.</strong> Your browser asks Google PageSpeed Insights to test the website address you entered. Google handles that request under its own privacy policy.</li>
            <li><strong>AI plan.</strong> If you ask for the full report, your audit answers and scan results are sent to Anthropic, the company behind Claude, to draft your 90-day plan. Your name and email are not included in what&rsquo;s sent to the AI.</li>
            <li><strong>Who sees it.</strong> Your report and contact details go to me and to my co-author, Loren Ankarlo, so one of us can follow up if you want help.</li>
          </ul>

          <H>Services that help run this site</H>
          <p className="mb-3">These companies process information only to provide their service to me:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Netlify</strong> hosts the website.</li>
            <li><strong>Resend</strong> delivers the emails the site sends.</li>
            <li><strong>Anthropic</strong> drafts the audit&rsquo;s 90-day plan.</li>
            <li><strong>Google</strong> runs the PageSpeed test.</li>
          </ul>

          <H>Cookies</H>
          <p>
            The public site doesn&rsquo;t set tracking or advertising cookies. The only cookie is a login cookie for the
            site&rsquo;s private admin area, which only I use.
          </p>

          <H>How long I keep it</H>
          <p>
            Messages and audit reports live in my email until they&rsquo;re no longer needed for the conversation. Ask me
            to delete yours at any time and I will.
          </p>

          <H>Your choices</H>
          <p>
            You can ask me what I have about you, ask me to correct it, or ask me to delete it. Email{' '}
            <a href="mailto:mike@mikehuber.com" className="text-navy-600 underline">mike@mikehuber.com</a> and I&rsquo;ll take care of it.
          </p>

          <H>Children</H>
          <p>This site is for businesses and professionals. It isn&rsquo;t meant for children, and I don&rsquo;t knowingly collect information from anyone under 16.</p>

          <H>Changes</H>
          <p>If I change this policy, I&rsquo;ll update it here and change the date at the top.</p>

          <H>Questions</H>
          <p>
            Email <a href="mailto:mike@mikehuber.com" className="text-navy-600 underline">mike@mikehuber.com</a> or use the{' '}
            <Link href="/contact" className="text-navy-600 underline">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
