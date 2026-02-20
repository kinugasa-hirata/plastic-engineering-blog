import Link from 'next/link'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export function Hero({
  title = 'プラスチック工学の最新情報をお届け',
  subtitle = '射出成形・押出成形・材料技術など、プラスチック製造に関する専門的な情報を発信しています。',
  ctaText = '記事を読む',
  ctaHref = '/articles',
}: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <Link
          href={ctaHref}
          className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-md"
        >
          {ctaText}
        </Link>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {['射出成形', '押出成形', '材料科学', '品質管理', '最新技術'].map((tag) => (
            <span
              key={tag}
              className="bg-blue-600 bg-opacity-50 border border-blue-400 text-blue-100 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
