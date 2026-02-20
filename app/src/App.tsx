import { useState, useEffect } from 'react';
import { Header } from '@/components/blog/Header';
import { Hero } from '@/components/blog/Hero';
import { ArticleList } from '@/components/blog/ArticleList';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Categories } from '@/components/blog/Categories';
import { Footer } from '@/components/blog/Footer';
import { ArticleModal } from '@/components/blog/ArticleModal';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import type { Article } from '@/types';
import { 
  getLatestArticles, 
  getPopularArticles,
  searchArticles 
} from '@/data/articles';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Article[] | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');

  // Track page views for analytics
  useEffect(() => {
    const trackPageView = () => {
      const pageView = {
        path: window.location.hash || '/',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };
      
      // Store in localStorage for demo purposes
      const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
      pageViews.push(pageView);
      localStorage.setItem('pageViews', JSON.stringify(pageViews.slice(-1000)));
    };

    trackPageView();
    window.addEventListener('hashchange', trackPageView);
    return () => window.removeEventListener('hashchange', trackPageView);
  }, []);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    
    // Update view count (in real app, this would be an API call)
    article.views += 1;
    
    // Show toast notification
    toast.info(`「${article.title}」を開きました`, {
      description: '記事をお読みいただきありがとうございます',
      duration: 3000,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const handleSearch = (query: string) => {
    const results = searchArticles(query);
    setSearchResults(results);
    
    if (results.length > 0) {
      toast.success(`${results.length}件の記事が見つかりました`, {
        description: `「${query}」の検索結果`,
      });
    } else {
      toast.error('記事が見つかりませんでした', {
        description: `「${query}」に一致する記事はありません`,
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    toast.info(`カテゴリー: ${categoryId}`, {
      description: '該当カテゴリーの記事を表示します',
    });
    // Scroll to latest articles section
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' });
  };

  const latestArticles = getLatestArticles(6);
  const popularArticles = getPopularArticles(6);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      
      <main>
        {currentView === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero />
            
            {/* Search Results */}
            {searchResults ? (
              <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      検索結果 ({searchResults.length}件)
                    </h2>
                    <button
                      onClick={() => setSearchResults(null)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      検索をクリア
                    </button>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.map((article) => (
                        <ArticleCard
                          key={article.slug}
                          article={article}
                          onClick={handleArticleClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      検索結果が見つかりませんでした
                    </div>
                  )}
                </div>
              </section>
            ) : null}
            
            {/* Latest Articles */}
            <div id="latest">
              <ArticleList
                articles={latestArticles}
                title="最新記事"
                subtitle="AIが自動収集・翻訳した最新の3Dプリンティング業界ニュース"
                showTabs={true}
                maxItems={6}
                onArticleClick={handleArticleClick}
              />
            </div>
            
            {/* Popular Articles */}
            <div id="popular" className="bg-gray-50">
              <ArticleList
                articles={popularArticles}
                title="人気記事"
                subtitle="最も多く読まれている記事ランキング"
                showTabs={false}
                maxItems={6}
                onArticleClick={handleArticleClick}
              />
            </div>
            
            {/* Categories */}
            <Categories onCategoryClick={handleCategoryClick} />
            
            {/* Automation Features Section */}
            <section id="automation" className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">AI自動更新システム</h2>
                  <p className="text-blue-200 max-w-2xl mx-auto">
                    世界中の情報源から3Dプリンティング関連ニュースを自動収集し、
                    AIが翻訳・要約してお届けします
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">自動コンテンツ収集</h3>
                    <p className="text-blue-200 text-sm">
                      50以上の情報源から24時間体制で最新ニュースを収集。
                      重要な情報を見逃しません。
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI翻訳・要約</h3>
                    <p className="text-blue-200 text-sm">
                      最新のAI技術で英文記事を高精度に翻訳し、
                      重要なポイントを要約してお届けします。
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">アクセス分析</h3>
                    <p className="text-blue-200 text-sm">
                      リアルタイムでアクセス状況を分析し、
                      人気コンテンツや改善点を自動検出します。
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <a
                    href="#admin"
                    className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    管理ダッシュボードを見る
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
      
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
