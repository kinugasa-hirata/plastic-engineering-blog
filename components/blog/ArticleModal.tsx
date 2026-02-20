'use client'

import { useEffect } from 'react'
import type { Article } from '@/types'

interface ArticleModalProps {
  article: Article | null
  isOpen: boolean
  onClose: () => void
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {article.imageUrl && (
          <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-2xl">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{article.category}</span>
            <span className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
            {article.readingTime && <span className="text-gray-400 text-xs">{article.readingTime}分で読める</span>}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">{article.title}</h2>
          {article.author && <p className="text-gray-500 text-sm">著者: {article.author}</p>}
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
