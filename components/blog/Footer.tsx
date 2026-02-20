import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg">プラスチック工学ブログ</h3>
            <p className="text-sm text-gray-400">射出成形・押出成形・材料技術など、プラスチック製造に関する専門情報を発信しています。</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-semibold">カテゴリ</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/成形技術" className="hover:text-white">成形技術</Link></li>
              <li><Link href="/category/材料" className="hover:text-white">材料</Link></li>
              <li><Link href="/category/設備・機械" className="hover:text-white">設備・機械</Link></li>
              <li><Link href="/category/品質管理" className="hover:text-white">品質管理</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-semibold">サイト情報</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">このブログについて</Link></li>
              <li><Link href="/articles" className="hover:text-white">記事一覧</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {currentYear} プラスチック工学ブログ. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
