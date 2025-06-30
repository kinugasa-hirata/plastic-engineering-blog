// app/layout.tsx
import { Inter, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
})

export const metadata = {
  title: 'プラスチック工学入門 | Plastic Engineering Guide',
  description: 'プラスチック工学の基礎から応用まで、わかりやすく解説するブログサイトです。',
  keywords: 'プラスチック, 工学, 材料科学, 高分子, エンジニアリング',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <head>
        {/* Google Analytics */}
        <script 
          async 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans`}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-noto-sans-jp">
                    プラスチック工学入門
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Plastic Engineering Guide
                  </p>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                    ホーム
                  </a>
                  <a href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors">
                    記事一覧
                  </a>
                  <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                    このサイトについて
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="max-w-6xl mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-gray-300">
                  © 2025 プラスチック工学入門. All rights reserved.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Powered by Next.js & Vercel
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}