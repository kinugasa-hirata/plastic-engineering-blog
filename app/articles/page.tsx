// app/articles/page.tsx
export default async function ArticlesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-noto-sans-jp">
          記事一覧
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          プラスチック工学に関する記事をカテゴリ別に探すことができます
        </p>
      </div>

      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          記事がありません
        </h3>
        <p className="text-gray-600">
          content/articles/ フォルダにMarkdownファイルを追加してください。
        </p>
      </div>
    </div>
  )
}