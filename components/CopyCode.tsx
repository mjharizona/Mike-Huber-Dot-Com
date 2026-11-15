'use client'
import { useEffect } from 'react'

// Adds a Copy button to every code block (AI prompts) inside a blog post body.
export default function CopyCode({ target = '.post-body' }: { target?: string }) {
  useEffect(() => {
    const root = document.querySelector(target)
    if (!root) return
    const made: HTMLButtonElement[] = []
    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'copy-btn'
      btn.textContent = 'Copy'
      btn.setAttribute('aria-label', 'Copy this prompt')
      btn.addEventListener('click', async () => {
        const text = pre.querySelector('code')?.innerText ?? pre.innerText
        try {
          await navigator.clipboard.writeText(text.replace(/\n$/, ''))
          btn.textContent = 'Copied'
        } catch {
          btn.textContent = 'Select and copy'
        }
        setTimeout(() => { btn.textContent = 'Copy' }, 2000)
      })
      pre.appendChild(btn)
      made.push(btn)
    })
    return () => made.forEach((b) => b.remove())
  }, [target])
  return null
}
