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

  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticles = fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const slug = name.replace(/\.md$/, '')
      return getArticleBySlug(slug)
    })
    .filter(Boolean) as Article[]

  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
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
  const allArticles = getAllArticles()
  return allArticles.slice(0, count)
}

export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getAllArticles()
  return allArticles.filter(article => article.category === category)
}

export function getCategories(): string[] {
  const allArticles = getAllArticles()
  const categories = [...new Set(allArticles.map(article => article.category))]
  return categories.sort()
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await marked(markdown)
  return result
}