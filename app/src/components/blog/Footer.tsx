import { Printer, Mail, Twitter, Linkedin, Github, Rss } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'コンテンツ': [
      { label: '最新記事', href: '#latest' },
      { label: '人気記事', href: '#popular' },
      { label: 'カテゴリー', href: '#categories' },
      { label: '管理ダッシュボード', href: '#admin' },
    ],
    '自動化機能': [
      { label: 'AIコンテンツ収集', href: '#automation' },
      { label: '自動翻訳・要約', href: '#automation' },
      { label: 'アクセス分析', href: '#admin' },
      { label: '改善提案システム', href: '#admin' },
    ],
    '情報源': [
      { label: '3D Printing Industry', href: 'https://3dprintingindustry.com' },
      { label: '3Dnatives', href: 'https://www.3dnatives.com' },
      { label: 'MONOist', href: 'https://monoist.itmedia.co.jp' },
      { label: 'TCT Magazine', href: 'https://www.tctmagazine.com' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">3Dプリンタ・プラスチック工学</h3>
                <p className="text-xs text-gray-400">3D Printing & Plastics Engineering</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              AIが世界中の3Dプリンティング業界ニュースを自動収集・翻訳・要約。
              技術動向から市場分析まで、最新情報をいち早くお届けします。
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-gray-300">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-1">ニュースレター登録</h4>
              <p className="text-sm text-gray-400">最新の記事をメールでお届けします</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} 3Dプリンタ・プラスチック工学ブログ. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              システム正常稼働中
            </span>
            <span>|</span>
            <span>AI自動更新システム v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
