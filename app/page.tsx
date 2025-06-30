// app/page.tsx
import Link from 'next/link'

export default async function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-noto-sans-jp">
            プラスチック工学の世界へようこそ
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            材料科学から製造技術まで、プラスチック工学の基礎と最新動向を
            <br />
            わかりやすく解説していきます。
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/articles" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              記事を読む
            </Link>
            <Link 
              href="/about" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 font-noto-sans-jp">
          注目のトピック
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🧪</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">材料特性</h4>
            <p className="text-gray-600 text-sm">
              プラスチックの基本的な物理・化学特性について学びます
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">成形技術</h4>
            <p className="text-gray-600 text-sm">
              射出成形、押出成形など様々な加工技術を解説します
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">持続可能性</h4>
            <p className="text-gray-600 text-sm">
              リサイクル技術と環境への配慮について考察します
            </p>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 font-noto-sans-jp">
            最新記事
          </h3>
          <Link 
            href="/articles" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            すべて見る →
          </Link>
        </div>
        
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">まだ記事がありません</p>
          <p className="text-sm text-gray-500">
            content/articles/ フォルダにMarkdownファイルを追加してください
          </p>
        </div>
      </section>
    </div>
  )
}