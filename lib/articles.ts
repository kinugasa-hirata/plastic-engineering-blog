// lib/articles.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featuredImage?: string
  author: string
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames: string[] = fs.readdirSync(articlesDirectory)
  const allArticles: Article[] = fileNames
    .filter((name: string) => name.endsWith('.md'))
    .map((name: string) => {
      const slug: string = name.replace(/\.md$/, '')
      return getArticleBySlug(slug)
    })
    .filter((article): article is Article => article !== null)

  return allArticles.sort((a: Article, b: Article) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath: string = path.join(articlesDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents: string = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      category: data.category || 'その他',
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      author: data.author || 'プラスチック工学編集部'
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

export async function getLatestArticles(count: number = 5): Promise<Article[]> {
  const allArticles: Article[] = getAllArticles()
  return allArticles.slice(0, count)
}

export function getArticlesByCategory(category: string): Article[] {
  const allArticles: Article[] = getAllArticles()
  return allArticles.filter((article: Article) => article.category === category)
}

export function getCategories(): string[] {
  const allArticles: Article[] = getAllArticles()
  const categories: string[] = [...new Set(allArticles.map((article: Article) => article.category))]
  return categories.sort()
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result: string = await marked(markdown)
  return result
}