// components/ImageUpload.tsx
'use client'

import { useState, useRef } from 'react'
import { uploadImage, resizeImage } from '@/lib/images'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload?: (imageUrl: string) => void
  maxSize?: number // MB
  accept?: string
  className?: string
}

export default function ImageUpload({ 
  onUpload, 
  maxSize = 5, 
  accept = "image/*",
  className = "" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // ファイルサイズチェック
    if (file.size > maxSize * 1024 * 1024) {
      return `ファイルサイズは${maxSize}MB以下にしてください`
    }

    // ファイル形式チェック
    if (!file.type.startsWith('image/')) {
      return '画像ファイルを選択してください'
    }

    return null
  }

  const handleUpload = async (file: File) => {
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setUploading(true)

    try {
      // 画像を最適化
      const resizedFile = await resizeImage(file, 1200, 0.8)
      
      // Vercel Blobにアップロード
      const result = await uploadImage(resizedFile)
      
      setUploadedImage(result.url)
      onUpload?.(result.url)
      
      // クリップボードにURLをコピー
      await navigator.clipboard.writeText(result.url)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'アップロードに失敗しました')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleUpload(files[0])
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* アップロードエリア */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600">アップロード中...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                クリックまたはドラッグ&ドロップで画像をアップロード
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF対応 (最大{maxSize}MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* 成功表示 */}
      {uploadedImage && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">
              ✅ アップロード完了！URLがクリップボードにコピーされました
            </p>
          </div>
          
          {/* プレビュー */}
          <div className="relative">
            <Image
              src={uploadedImage}
              alt="アップロード済み画像"
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>

          {/* URL表示 */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">画像URL:</p>
            <code className="text-xs bg-white p-2 rounded border block break-all">
              {uploadedImage}
            </code>
          </div>
        </div>
      )}
    </div>
  )
}