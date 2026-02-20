import { ArticleCard, Article } from './ArticleCard'

interface ArticleListProps {
  articles: Article[]
  title?: string
  emptyMessage?: string
}

export function ArticleList({
  articles,
  title,
  emptyMessage = '記事が見つかりませんでした。',
}: ArticleListProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          {title}
        </h2>
      )}

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl mb-4 block">📭</span>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}
