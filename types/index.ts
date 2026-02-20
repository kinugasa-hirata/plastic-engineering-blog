export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  date: string
  content: string
  tags: string[]
  views: number
  imageUrl?: string
  featuredImage?: string
  author?: string
  readingTime?: number
  likes?: number
  translated?: boolean
  sourceUrl?: string
  sourceName?: string
}

export interface Category {
  name: string
  slug: string
  count?: number
}
