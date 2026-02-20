import type { Article } from '@/types'
import { ArticleCard } from './ArticleCard'

interface ArticleListProps {
  articles: Article[]
  title?: string
  subtitle?: string
  emptyMessage?: string
  showTabs?: boolean
  maxItems?: number
  onArticleClick?: (article: Article) => void
}

export function ArticleList({
  articles,
  title,
  subtitle,
  emptyMessage = '記事が見つかりませんでした。',
  maxItems,
  onArticleClick,
}: ArticleListProps) {
  const displayed = maxItems ? articles.slice(0, maxItems) : articles

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b border-gray-200">{title}</h2>}
          {subtitle && <p className="text-gray-500 text-sm mt-2">{subtitle}</p>}
        </div>
      )}
      {displayed.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl mb-4 block">📭</span>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((article) => (
            <ArticleCard key={article.id} article={article} onClick={onArticleClick} />
          ))}
        </div>
      )}
    </section>
  )
}
