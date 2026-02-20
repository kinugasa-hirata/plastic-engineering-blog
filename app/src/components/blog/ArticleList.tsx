import { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  title: string;
  subtitle?: string;
  showTabs?: boolean;
  maxItems?: number;
  onArticleClick?: (article: Article) => void;
}

export function ArticleList({ 
  articles, 
  title, 
  subtitle, 
  showTabs = true, 
  maxItems = 6,
  onArticleClick 
}: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = ['すべて', ...new Set(articles.map(a => a.category))];
  
  const getArticlesByCategory = (category: string) => {
    if (category === 'すべて') return articles;
    return articles.filter(a => a.category === category);
  };

  const itemsPerPage = maxItems;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {showTabs ? (
          <Tabs defaultValue="すべて" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => {
              const categoryArticles = getArticlesByCategory(category);
              return (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryArticles.slice(0, maxItems).map((article) => (
                      <ArticleCard
                        key={article.slug}
                        article={article}
                        onClick={onArticleClick}
                      />
                    ))}
                  </div>
                  {categoryArticles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      このカテゴリーの記事はまだありません
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  onClick={onArticleClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
