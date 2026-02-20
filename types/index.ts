export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  imageUrl?: string
  author?: string
  readingTime?: number
  content?: string
  tags?: string[]
  views: number
}

export interface Category {
  name: string
  slug: string
  count?: number
}
