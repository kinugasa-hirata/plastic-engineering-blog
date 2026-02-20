'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  currentCategory?: string
  onSearch?: (query: string) => void
}

const categories = [
  { name: 'すべて', slug: '' },
  { name: '成形技術', slug: '成形技術' },
  { name: '材料', slug: '材料' },
  { name: '設備・機械', slug: '設備・機械' },
  { name: '品質管理', slug: '品質管理' },
  { name: '業界ニュース', slug: '業界ニュース' },
]

export function Header({ currentCategory, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(searchQuery)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="text-xl font-bold text-blue-700 whitespace-nowrap">
            プラスチック工学ブログ
          </Link>
          {onSearch && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="記事を検索..."
                className="w-full border border-gray-200 rounded-l-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded-r-lg text-sm hover:bg-blue-700">
                検索
              </button>
            </form>
          )}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/articles" className="text-gray-600 hover:text-blue-600 text-sm font-medium">記事一覧</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">このブログについて</Link>
          </nav>
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <Link key={cat.slug} href={cat.slug ? /category/ : '/'} className={px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors }>
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          <Link href="/articles" className="block py-2 text-gray-700 hover:text-blue-600">記事一覧</Link>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600">このブログについて</Link>
        </div>
      )}
    </header>
  )
}
