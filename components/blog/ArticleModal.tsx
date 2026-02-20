'use client'

import { useEffect } from 'react'
import type { Article } from '@/types'

interface ArticleModalProps {
  article: Article | null
  onClose: () => void
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 space-y-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{article.category}</span>
          <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
          <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
          <div className="flex gap-3 pt-2">
            <a href={/articles/} className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-blue-700">記事を読む</a>
            <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  )
}
