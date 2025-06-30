import ImageGallery from '@/components/ImageGallery'

export default function ImageAdminPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">画像管理</h1>
      <ImageGallery />
    </div>
  )
}