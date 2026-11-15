// "Skim, Skip, Read" post format (Nov 11, 2026). Turns plain-markdown conventions into the template's page pieces,
// so post files stay simple markdown:
//   > **The short answer**  ... paragraph(s)            -> shaded answer box
//   > **Three takeaways**   - bullet  - bullet  - bullet -> takeaways box
//   > **Try this**          ... prompt / tool            -> Try this box
//   > **Why it matters**    ... one line                 -> why-it-matters line
//   <!-- toc -->                                         -> "In this post" jump links to every ## heading
//   ![alt](src) then *caption* on the next line          -> figure with caption (styled in globals.css)
// Every ## heading gets an id so jump links (and links from other posts) can point at it.

const BOXES: [RegExp, string][] = [
  [/^the short answer$/i, 'box box-answer'],
  [/^(three |3 )?takeaways$/i, 'box box-takeaways'],
  [/^try this\b/i, 'box box-try'],
  [/^why it matters$/i, 'box box-why'],
]

const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’').replace(/&quot;/g, '"').trim()

export const slugify = (s: string) =>
  text(s).toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

export function formatPostHtml(html: string): string {
  // 1. ids on every h2 (unique), collected for the jump links
  const seen = new Map<string, number>()
  const toc: { id: string; label: string }[] = []
  let out = html.replace(/<h2(?: id="[^"]*")?>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    let id = slugify(inner) || 'section'
    const n = seen.get(id) ?? 0
    seen.set(id, n + 1)
    if (n) id = `${id}-${n + 1}`
    toc.push({ id, label: text(inner) })
    return `<h2 id="${id}">${inner}</h2>`
  })

  // 2. labelled blockquotes become boxes
  out = out.replace(/<blockquote>\s*<p><strong>([^<]+)<\/strong>/g, (m, label: string) => {
    const hit = BOXES.find(([re]) => re.test(label.trim()))
    return hit ? `<blockquote class="${hit[1]}">\n<p class="box-label"><strong>${label}</strong>` : m
  })
  // the label sits alone on its line: close its paragraph so the body starts fresh
  out = out.replace(/<p class="box-label"><strong>([^<]+)<\/strong>(?:<br>|\n)/g, '<p class="box-label"><strong>$1</strong></p>\n<p>')

  // 3. jump links
  if (toc.length) {
    const items = toc.filter((t) => !/^(faq|frequently asked questions|sources)$/i.test(t.label))
    const nav = `<nav class="post-toc" aria-label="In this post"><p class="box-label"><strong>In this post</strong></p><ul>${items
      .map((t) => `<li><a href="#${t.id}">${t.label.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</a></li>`)
      .join('')}</ul></nav>`
    out = out.replace(/<!--\s*toc\s*-->/i, nav)
  } else out = out.replace(/<!--\s*toc\s*-->/i, '')

  // 4. image followed by an italic line in the same paragraph = figure with caption
  out = out.replace(/<p>(<img [^>]+>)\s*(?:<br>)?\s*<em>([\s\S]*?)<\/em><\/p>/g, '<figure class="post-figure">$1<figcaption>$2</figcaption></figure>')
  return out
}
