import Link from 'next/link'

interface CategoriesProps {
  currentCategory?: string
  onCategoryClick?: (categoryId: string) => void
}

const cats = ['成形技術','材料','設備・機械','品質管理','業界ニュース']

export function Categories({ currentCategory, onCategoryClick }: CategoriesProps) {
  return (
    <section className="bg-white border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => onCategoryClick && onCategoryClick('')}
          className={px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors }
        >
          すべて
        </button>
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryClick && onCategoryClick(cat)}
            className={px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors }
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  )
}
