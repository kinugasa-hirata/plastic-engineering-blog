import Link from 'next/link'

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  imageUrl?: string
  author?: string
  readingTime?: number
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="p-5 space-y-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{article.category}</span>
        <h2 className="font-bold text-gray-800 leading-snug">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="text-gray-500 text-sm">{article.excerpt}</p>
        <span className="text-gray-400 text-xs">{formattedDate}</span>
      </div>
    </article>
  )
}
