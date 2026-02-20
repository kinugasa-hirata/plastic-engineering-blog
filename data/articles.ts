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
  pageViews: [] as number[],
  categoryDistribution: [] as { name: string; value: number }[],
  topArticles: [] as { title: string; views: number }[],
  dailyStats: [] as { date: string; visitors: number; pageViews: number }[],
  monthlyGrowth: [] as { month: string; articles: number; visitors: number }[],
  topPages: [] as { path: string; views: number; uniqueVisitors: number; avgTimeOnPage: number }[],
  uniqueVisitors: 0,
  totalPageViews: 0,
  averageSessionDuration: 0,
  bounceRate: 0,
  totalVisitors: 0,
  totalArticles: 0,
  avgReadTime: 0,
}

export const systemHealth = {
  status: 'healthy',
  uptime: 100,
  lastUpdated: new Date().toISOString(),
  lastScrapeTime: new Date().toISOString(),
  nextScheduledScrape: new Date(Date.now() + 3600000).toISOString(),
  articlesThisWeek: 0,
  storageUsage: 0.25,
  cpu: 0,
  memory: 0,
  storage: 0,
}

export const improvementSuggestions: {
  id: string
  title: string
  description: string
  priority: string
  type: 'content' | 'ux' | 'seo' | 'performance'
  impact: 'high' | 'medium' | 'low'
  autoImplementable: boolean
  implemented: boolean
}[] = []

export const notifications: {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
  type: 'info' | 'warning' | 'alert' | 'suggestion'
}[] = []
