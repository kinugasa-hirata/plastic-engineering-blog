import { Calendar, Eye, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
  onClick?: (article: Article) => void;
}

export function ArticleCard({ article, variant = 'default', onClick }: ArticleCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  if (variant === 'compact') {
    return (
      <Card 
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden"
        onClick={handleClick}
      >
        <div className="flex gap-4 p-4">
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={article.featuredImage || 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400'}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="mb-2 text-xs">
              {article.category}
            </Badge>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString('ja-JP')}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card 
        className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
        onClick={handleClick}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={article.featuredImage || 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="mb-2 bg-blue-600 hover:bg-blue-700">
              {article.category}
            </Badge>
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {article.title}
            </h3>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-gray-600 line-clamp-3 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('ja-JP')}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {article.likes}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 group-hover:translate-x-1 transition-transform">
              読む
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden flex flex-col h-full"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.featuredImage || 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=600'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
        {article.translated && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              AI翻訳
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.date).toLocaleDateString('ja-JP')}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString()}
            </span>
          </div>
          {article.sourceName && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <ExternalLink className="w-3 h-3" />
              {article.sourceName}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
