'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageItem {
  url: string
  pathname: string
  uploadedAt: string
  size: number
}

interface ImageGalleryProps {
  onSelect?: (url: string) => void
}

export default function ImageGallery({ onSelect }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/images')
      if (!response.ok) throw new Error('画像の取得に失敗しました')
      const data = await response.json()
      setImages(data.images || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '画像の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const handleDelete = async (url: string) => {
    if (!confirm('この画像を削除しますか？')) return
    try {
      const response = await fetch('/api/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!response.ok) throw new Error('削除に失敗しました')
      setImages(images.filter((img) => img.url !== url))
    } catch (err) {
      alert(err instanceof Error ? err.message : '削除に失敗しました')
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">読み込み中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchImages}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm"
        >
          再試行
        </button>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>アップロードされた画像はありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{images.length} 枚の画像</p>
        <button
          onClick={fetchImages}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          更新
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.url}
            className="group relative border rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-shadow"
          >
            {/* Image Preview */}
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.pathname}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Info & Actions */}
            <div className="p-2 space-y-1">
              <p className="text-xs text-gray-500 truncate" title={image.pathname}>
                {image.pathname.split('/').pop()}
              </p>
              <p className="text-xs text-gray-400">{formatSize(image.size)}</p>

              <div className="flex gap-1 pt-1">
                {onSelect ? (
                  <button
                    onClick={() => onSelect(image.url)}
                    className="flex-1 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    選択
                  </button>
                ) : (
                  <button
                    onClick={() => handleCopy(image.url)}
                    className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    {copiedUrl === image.url ? '✓ コピー済み' : 'URLコピー'}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(image.url)}
                  className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-600 rounded"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
