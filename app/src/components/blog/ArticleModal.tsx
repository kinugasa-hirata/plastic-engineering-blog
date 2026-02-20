import { X, Calendar, Eye, Heart, User, ExternalLink, Tag, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Article } from '@/types';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  if (!isOpen || !article) return null;

  // Convert markdown-like content to HTML (simple version)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.replace('# ', '')}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">{line.replace('#### ', '')}</h4>;
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6 text-gray-700 leading-relaxed">{line.replace('- ', '')}</li>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={index} className="text-gray-900">{line.replace(/\*\*/g, '')}</strong>;
        }
        
        // Empty line
        if (line.trim() === '') {
          return <div key={index} className="h-4" />;
        }
        
        // Regular paragraph
        return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80">
          <img
            src={article.featuredImage || 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=1200'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                {article.category}
              </Badge>
              {article.translated && (
                <Badge variant="outline" className="bg-white/20 text-white border-white/40">
                  AI翻訳
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(90vh-20rem)]">
          <div className="p-6 sm:p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('ja-JP')}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} 閲覧
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="w-4 h-4" />
                {article.likes} いいね
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
              <p className="text-gray-700 italic">{article.excerpt}</p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(article.content)}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">タグ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Source */}
            {article.sourceUrl && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">元記事：</p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {article.sourceName || '原文を読む'}
                </a>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              共有
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="w-4 h-4" />
              保存
            </Button>
          </div>
          <Button onClick={onClose} variant="default" size="sm">
            閉じる
          </Button>
        </div>
      </div>
    </div>
  );
}
