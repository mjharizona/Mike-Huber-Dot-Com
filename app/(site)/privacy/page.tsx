import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information mikehuber.com collects, how it is used, and how to have it deleted.',
}

const UPDATED = 'October 11, 2026'

function H({ children }: { children: React.ReactNode }) {
  return <h2>{children}</h2>
}

export default function PrivacyPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="wrap">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy policy</h1>
          <p className="lead">Plain English: what this site collects, why, and how to have it deleted. Last updated {UPDATED}.</p>
        </div>
      </section>
      <section className="section white">
        <div className="wrap prose-page">
          <p>
            This site is run by Mike Huber (&ldquo;I,&rdquo; &ldquo;me&rdquo;). I keep it simple: I only collect what you
            choose to send me, I use it to answer you, and I never sell it.
          </p>

          <H>What I collect</H>
          <p><strong>When you use the contact form:</strong> your name, email, and anything else you fill in, such as phone, company and your message.</p>
          <p>
            <strong>When you use the free audit:</strong> your website address, your business name, what you sell, where you
            serve, your answers to the audit questions, your budget range and timeline. If you ask for the full report, also
            your name and email.
          </p>
          <p>
            <strong>When you take a Team Readiness Assessment:</strong> your ratings and any comments you choose to write.
            The assessment doesn&rsquo;t ask for your name or email. See &ldquo;The Team Readiness Assessment, in detail&rdquo; below.
          </p>
          <p>
            <strong>When you book a call:</strong> the booking calendar on this site is provided by Koalendar. The name,
            email and any notes you enter there go to Koalendar and to my calendar so we can meet.
          </p>
          <p>
            <strong>Automatically:</strong> like almost every website, my hosting provider keeps standard server logs, such as
            IP address, browser type and the pages requested, to keep the site running and secure. This site doesn&rsquo;t use
            advertising cookies, tracking pixels or third-party analytics.
          </p>

          <H>How I use it</H>
          <ul>
            <li>To answer your message or send the audit report you asked for.</li>
            <li>To follow up about your inquiry or audit, if you agreed to that. You can tell me to stop at any time.</li>
            <li>To keep the site secure and stop spam.</li>
          </ul>
          <p>I don&rsquo;t add you to a mailing list, and I don&rsquo;t sell, rent or trade your information.</p>

          <H>The free audit, in detail</H>
          <ul>
            <li><strong>Website scan.</strong> The audit reads the public home page of the website you enter, the same page any visitor can see. It doesn&rsquo;t log in or look at anything private.</li>
            <li><strong>Speed test.</strong> Your browser asks Google PageSpeed Insights to test the website address you entered. Google handles that request under its own privacy policy.</li>
            <li><strong>AI plan.</strong> If you ask for the full report, your audit answers and scan results are sent to Anthropic, the company behind Claude, to draft your 90-day plan. Your name and email are not included in what&rsquo;s sent to the AI.</li>
            <li><strong>Who sees it.</strong> Your report and contact details go to me and to my co-author, Loren Ankarlo, so one of us can follow up if you want help.</li>
          </ul>

          <H>The Team Readiness Assessment, in detail</H>
          <ul>
            <li><strong>Who takes it.</strong> Organizations that book a workshop with me and Loren Ankarlo invite their people with a private link.</li>
            <li><strong>What&rsquo;s saved.</strong> Your ratings, your optional comments, the date, and whether you used the leadership link or the team link. Not your name, email or IP address.</li>
            <li><strong>Your own results.</strong> Your scores and PDF are made in your browser. Your progress is kept on your own device until you finish.</li>
            <li><strong>What your organization sees.</strong> Only combined results, and only once at least three people have answered. Leadership answers are shown as a group, which the leadership link explains. Comments are summarized into themes and never quoted.</li>
            <li><strong>AI summaries.</strong> To summarize comments, the comments (without any names) are sent to Anthropic, the company behind Claude.</li>
            <li><strong>Who can see the raw answers.</strong> Only me and Loren, to run the workshop. We don&rsquo;t share them.</li>
            <li><strong>How long.</strong> We keep responses for up to two years so your organization can compare before and after, then delete them. Your organization can ask us to delete them sooner.</li>
          </ul>

          <H>Services that help run this site</H>
          <p>These companies process information only to provide their service to me:</p>
          <ul>
            <li><strong>Netlify</strong> hosts the website and stores Team Readiness Assessment responses.</li>
            <li><strong>Resend</strong> delivers the emails the site sends.</li>
            <li><strong>Anthropic</strong> drafts the audit&rsquo;s 90-day plan and summarizes assessment comments.</li>
            <li><strong>Google</strong> runs the PageSpeed test.</li>
            <li><strong>Koalendar</strong> runs the booking calendar.</li>
          </ul>

          <H>Cookies</H>
          <p>
            This site doesn&rsquo;t set tracking or advertising cookies. The only cookie it sets is a login cookie for the
            site&rsquo;s private admin area, which only I use. The booking calendar on the Book a Call page comes from
            Koalendar and may set its own cookies under Koalendar&rsquo;s privacy policy. When you dismiss the cookie notice, your browser stores a small note on your own device so the notice doesn&rsquo;t reappear. It isn&rsquo;t sent to me or used to track you.
          </p>

          <H>How long I keep it</H>
          <p>
            Messages and audit reports live in my email until they&rsquo;re no longer needed for the conversation. Ask me
            to delete yours at any time and I will.
          </p>

          <H>Your choices</H>
          <p>
            You can ask me what I have about you, ask me to correct it, or ask me to delete it. Email{' '}
            <a href="mailto:mike@mikehuber.com" className="text-link">mike@mikehuber.com</a> and I&rsquo;ll take care of it.
          </p>

          <H>Children</H>
          <p>This site is for businesses and professionals. It isn&rsquo;t meant for children, and I don&rsquo;t knowingly collect information from anyone under 16.</p>

          <H>Changes</H>
          <p>If I change this policy, I&rsquo;ll update it here and change the date at the top.</p>

          <H>Questions</H>
          <p>
            Email <a href="mailto:mike@mikehuber.com" className="text-link">mike@mikehuber.com</a> or use the{' '}
            <Link href="/contact" className="text-link">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
