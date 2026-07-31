import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'

export default function AdminPostsPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy-900">Blog Posts</h1>
        <div className="card py-3 px-4 bg-navy-50 border-navy-100 text-sm text-navy-700 max-w-xs">
          <p className="font-semibold mb-1">Adding a new post</p>
          <p className="text-xs text-navy-500">
            Create a <code className="bg-white px-1 rounded">.md</code> or{' '}
            <code className="bg-white px-1 rounded">.mdx</code> file in{' '}
            <code className="bg-white px-1 rounded">content/posts/</code> — it will appear here and
            on the public blog automatically.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">📝</p>
          <p>No posts yet. Add markdown files to <code>content/posts/</code> to get started.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-widest">Title</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-widest">Date</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-widest">Tags</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy-900">{post.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-navy-600 hover:underline text-xs font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
