import type { Article } from '@/types'

export const articles: Article[] = []

export function getLatestArticles(count: number = 10): Article[] {
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

export function getPopularArticles(count: number = 5): Article[] {
  return articles.slice(0, count)
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase()
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  )
}

export const mockAnalyticsData = {
  pageViews: [],
  categoryDistribution: [],
  topArticles: [],
}

export const systemHealth = {
  status: 'healthy',
  uptime: 100,
  lastUpdated: new Date().toISOString(),
}

export const improvementSuggestions: string[] = []

export const notifications: { id: string; message: string; read: boolean }[] = []
