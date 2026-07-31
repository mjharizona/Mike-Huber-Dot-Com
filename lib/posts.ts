import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  coverImage?: string
}

export interface Post extends PostMeta {
  content: string
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => /\.mdx?$/.test(f))

  const posts = files.map((filename) => {
    const fullPath = path.join(postsDir, filename)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(raw)

    return {
      slug: slugify(filename),
      title: data.title ?? 'Untitled',
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? '',
      author: data.author ?? 'Mike Huber',
      tags: data.tags ?? [],
      coverImage: data.coverImage ?? null,
    } as PostMeta
  })

  // Sort newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const mdPath  = path.join(postsDir, `${slug}.md`)
  const mdxPath = path.join(postsDir, `${slug}.mdx`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt ?? '',
    author: data.author ?? 'Mike Huber',
    tags: data.tags ?? [],
    coverImage: data.coverImage ?? null,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => /\.mdx?$/.test(f))
    .map(slugify)
}
