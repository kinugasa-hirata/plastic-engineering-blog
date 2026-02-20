import { 
  Printer, 
  FlaskConical, 
  Factory, 
  Heart, 
  Building2, 
  Car, 
  Leaf, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: '3Dプリンター技術',
    name: '3Dプリンター技術',
    description: '最新の3Dプリンター技術と製品レビュー',
    icon: Printer,
    color: 'bg-blue-500',
    articleCount: 12,
  },
  {
    id: '材料開発',
    name: '材料開発',
    description: '新素材とバイオマテリアルの研究動向',
    icon: FlaskConical,
    color: 'bg-purple-500',
    articleCount: 8,
  },
  {
    id: '産業応用',
    name: '産業応用',
    description: '製造業での実用事例と導入効果',
    icon: Factory,
    color: 'bg-indigo-500',
    articleCount: 15,
  },
  {
    id: '医療・ヘルスケア',
    name: '医療・ヘルスケア',
    description: '医療用インプラントとバイオプリンティング',
    icon: Heart,
    color: 'bg-red-500',
    articleCount: 10,
  },
  {
    id: '建築・建設',
    name: '建築・建設',
    description: '建設3Dプリンティングと建築応用',
    icon: Building2,
    color: 'bg-orange-500',
    articleCount: 6,
  },
  {
    id: '自動車・航空',
    name: '自動車・航空',
    description: '輸送機器産業での応用事例',
    icon: Car,
    color: 'bg-cyan-500',
    articleCount: 9,
  },
  {
    id: 'サステナビリティ',
    name: 'サステナビリティ',
    description: '環境配慮型材料と循環型製造',
    icon: Leaf,
    color: 'bg-green-500',
    articleCount: 7,
  },
  {
    id: '市場動向',
    name: '市場動向',
    description: '業界ニュースと市場分析',
    icon: TrendingUp,
    color: 'bg-pink-500',
    articleCount: 14,
  },
];

interface CategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function Categories({ onCategoryClick }: CategoriesProps) {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">カテゴリー</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            興味のある分野から記事を探すことができます
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden"
                onClick={() => onCategoryClick?.(category.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {category.articleCount}記事
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mt-4 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    記事を見る
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
