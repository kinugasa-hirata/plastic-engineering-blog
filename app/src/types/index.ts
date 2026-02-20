// Types for the 3D Printing Blog System

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  author: string;
  sourceUrl?: string;
  sourceName?: string;
  translated: boolean;
  views: number;
  likes: number;
}

export interface AnalyticsData {
  pageViews: PageView[];
  uniqueVisitors: number;
  totalPageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: TopPage[];
  userJourney: UserJourney[];
  dailyStats: DailyStat[];
}

export interface PageView {
  path: string;
  timestamp: string;
  userAgent: string;
  referrer?: string;
  sessionId: string;
}

export interface TopPage {
  path: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
}

export interface UserJourney {
  sessionId: string;
  pages: string[];
  duration: number;
  exitPage: string;
}

export interface DailyStat {
  date: string;
  visitors: number;
  pageViews: number;
  newArticles: number;
}

export interface ContentSource {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api' | 'scrape';
  category: string;
  lastScraped?: string;
  isActive: boolean;
  scrapeFrequency: 'hourly' | 'daily' | 'weekly';
}

export interface ScrapedContent {
  id: string;
  sourceId: string;
  originalUrl: string;
  title: string;
  content: string;
  publishedAt: string;
  scrapedAt: string;
  processed: boolean;
  articleSlug?: string;
}

export interface SystemHealth {
  lastScrapeTime: string;
  nextScheduledScrape: string;
  articlesThisWeek: number;
  failedScrapes: number;
  apiStatus: 'healthy' | 'degraded' | 'down';
  storageUsage: number;
}

export interface ImprovementSuggestion {
  id: string;
  type: 'content' | 'ux' | 'seo' | 'performance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  autoImplementable: boolean;
  implemented: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'alert' | 'suggestion';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export interface UserBehavior {
  scrollDepth: number;
  clickPatterns: ClickPattern[];
  timeOnPage: number;
  interactions: Interaction[];
}

export interface ClickPattern {
  element: string;
  clicks: number;
  position: { x: number; y: number };
}

export interface Interaction {
  type: 'click' | 'scroll' | 'hover' | 'form_submit';
  target: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type ArticleCategory = 
  | '3Dプリンター技術'
  | '材料開発'
  | '産業応用'
  | '医療・ヘルスケア'
  | '建築・建設'
  | '自動車・航空'
  | 'サステナビリティ'
  | '市場動向';
