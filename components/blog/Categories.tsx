import Link from 'next/link'

interface CategoriesProps {
  currentCategory?: string
}

const cats = ['成形技術','材料','設備・機械','品質管理','業界ニュース']

export function Categories({ currentCategory }: CategoriesProps) {
  return (
    <section className="bg-white border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto">
        <Link href="/" className={px-3 py-1.5 rounded-full text-sm whitespace-nowrap }>すべて</Link>
        {cats.map((cat) => (
          <Link key={cat} href={/category/} className={px-3 py-1.5 rounded-full text-sm whitespace-nowrap }>{cat}</Link>
        ))}
      </div>
    </section>
  )
}
