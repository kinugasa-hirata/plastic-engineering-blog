import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  onClick?: (article: Article) => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <article
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
      onClick={() => onClick && onClick(article)}
    >
      {article.imageUrl ? (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <span className="text-blue-300 text-4xl">📄</span>
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{article.category}</span>
          {article.readingTime && <span className="text-gray-400 text-xs">{article.readingTime}分で読める</span>}
        </div>
        <h2 className="font-bold text-gray-800 leading-snug line-clamp-2 hover:text-blue-600">{article.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-gray-400 text-xs">{formattedDate}</span>
          {article.author && <span className="text-gray-500 text-xs">{article.author}</span>}
        </div>
      </div>
    </article>
  )
}
