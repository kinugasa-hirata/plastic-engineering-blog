// app/articles/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, getCategories } from '@/lib/articles'

export default async function ArticlesPage() {
  let allArticles = []
  let categories = []
  
  try {
    allArticles = getAllArticles()
    categories = getCategories()
  } catch (error) {
    console.log('No articles found yet')
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-noto-sans-jp">
          記事一覧
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          プラスチック工学に関する記事をカテゴリ別に探すことができます
        </p>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            すべて
          </span>
          {categories.map((category) => (
            <span 
              key={category}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {allArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((article) => (
            <article 
              key={article.slug} 
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              {article.featuredImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('ja-JP')}
                  </time>
                  <span className="mx-2">•</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {article.category}
                  </span>
                </div>
                <h2 className="font-semibold text-xl mb-3 line-clamp-2">
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.author}
                  </span>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    続きを読む →
                  </Link>
                </div>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">📄</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              記事がありません
            </h3>
            <p className="text-gray-600 mb-6">
              content/articles/ フォルダにMarkdownファイルを追加して、最初の記事を作成してください。
            </p>
            <div className="bg-white p-4 rounded border text-left text-sm">
              <p className="font-mono text-gray-800 mb-2">
                例: content/articles/plastic-basics-2025-01.md
              </p>
              <p className="text-gray-600">
                ファイルを追加後、ページが自動的に更新されます。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}