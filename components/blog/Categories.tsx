import Link from 'next/link'

interface Category {
  name: string
  slug: string
  count?: number
}

interface CategoriesProps {
  categories?: Category[]
  currentCategory?: string
}

const defaultCategories: Category[] = [
  { name: 'すべて', slug: '' },
  { name: '成形技術', slug: '成形技術' },
  { name: '材料', slug: '材料' },
  { name: '設備・機械', slug: '設備・機械' },
  { name: '品質管理', slug: '品質管理' },
  { name: '業界ニュース', slug: '業界ニュース' },
]

export function Categories({ categories = defaultCategories, currentCategory }: CategoriesProps) {
  return (
    <section className="bg-white border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto">
        <span className="text-gray-500 text-sm font-medium whitespace-nowrap mr-2">カテゴリ:</span>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug ? `/category/${cat.slug}` : '/'}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              currentCategory === cat.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.name}
            {cat.count !== undefined && (
              <span className={`text-xs ${currentCategory === cat.slug ? 'text-blue-200' : 'text-gray-400'}`}>
                ({cat.count})
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
