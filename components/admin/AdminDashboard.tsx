'use client'

export function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">管理ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-700 mb-2">記事管理</h2>
          <p className="text-gray-500 text-sm">記事の作成・編集・削除</p>
          <a href="/admin/articles" className="mt-4 inline-block text-blue-600 text-sm hover:underline">管理する →</a>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-700 mb-2">画像管理</h2>
          <p className="text-gray-500 text-sm">画像のアップロード・削除</p>
          <a href="/admin/images" className="mt-4 inline-block text-blue-600 text-sm hover:underline">管理する →</a>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-700 mb-2">カテゴリ管理</h2>
          <p className="text-gray-500 text-sm">カテゴリの追加・編集</p>
          <a href="/admin/categories" className="mt-4 inline-block text-blue-600 text-sm hover:underline">管理する →</a>
        </div>
      </div>
    </div>
  )
}
