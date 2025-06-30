// app/about/page.tsx
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-noto-sans-jp">
          このサイトについて
        </h1>
        <p className="text-xl text-gray-600">
          プラスチック工学入門へようこそ
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            サイトの目的
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            プラスチック工学入門は、プラスチック材料と加工技術に関する知識を体系的に学べるオンライン学習サイトです。
            材料科学の基礎から最新の製造技術まで、実務に役立つ情報をわかりやすく解説します。
          </p>
          <p className="text-gray-700 leading-relaxed">
            初心者から専門家まで、様々なレベルの読者に有用な情報を提供することを目指しています。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            主要な学習領域
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">
                🧪 材料科学
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 高分子化学の基礎</li>
                <li>• プラスチックの分類と特性</li>
                <li>• 材料試験と評価方法</li>
                <li>• 添加剤と複合材料</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-green-900">
                ⚙️ 加工技術
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 射出成形技術</li>
                <li>• 押出成形とフィルム加工</li>
                <li>• ブロー成形と中空成形</li>
                <li>• 3Dプリンティング</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-purple-900">
                ♻️ 持続可能性
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• リサイクル技術</li>
                <li>• 生分解性プラスチック</li>
                <li>• ライフサイクルアセスメント</li>
                <li>• 環境配慮設計</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-orange-900">
                📊 品質管理
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 統計的品質管理</li>
                <li>• 不良解析と対策</li>
                <li>• 工程管理</li>
                <li>• 国際規格対応</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            更新頻度
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトでは、月に1〜2回の頻度で新しい記事を公開しています。
            最新の技術動向や研究成果を踏まえ、実務に役立つ情報を継続的に提供します。
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              <strong>最新情報のお知らせ:</strong> 
              記事の更新情報を受け取りたい方は、ブックマークへの追加をお勧めします。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            技術仕様
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">サイト構成</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• <strong>フレームワーク:</strong> Next.js 14 + TypeScript</li>
              <li>• <strong>スタイリング:</strong> Tailwind CSS</li>
              <li>• <strong>ホスティング:</strong> Vercel</li>
              <li>• <strong>コンテンツ管理:</strong> Markdown + Git</li>
              <li>• <strong>アナリティクス:</strong> Google Analytics</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            お問い合わせ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            記事の内容に関するご質問や、取り上げてほしいトピックがございましたら、
            GitHubリポジトリのIssueからお気軽にお知らせください。
          </p>
          <div className="flex space-x-4">
            <Link 
              href="/articles"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              記事を読む
            </Link>
            <Link 
              href="/"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}