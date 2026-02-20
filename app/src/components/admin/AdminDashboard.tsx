import { useState } from 'react';
import { 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Zap,
  Settings,
  FileText,
  Globe,
  Cpu,
  Database,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockAnalyticsData, systemHealth, improvementSuggestions, notifications } from '@/data/articles';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // Prepare chart data
  const dailyStatsData = mockAnalyticsData.dailyStats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
    visitors: stat.visitors,
    pageViews: stat.pageViews,
  }));

  const topPagesData = mockAnalyticsData.topPages.slice(0, 5).map(page => ({
    name: page.path.split('/').pop() || 'Home',
    views: page.views,
  }));

  const categoryData = [
    { name: '3Dプリンター技術', value: 12 },
    { name: '産業応用', value: 15 },
    { name: '市場動向', value: 14 },
    { name: '医療・ヘルスケア', value: 10 },
    { name: '自動車・航空', value: 9 },
    { name: 'その他', value: 21 },
  ];

  return (
    <section id="admin" className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              管理ダッシュボード
            </h2>
            <p className="text-gray-600 mt-1">
              AI自動更新システムとアクセス分析のモニタリング
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              更新
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4" />
              設定
            </Button>
          </div>
        </div>

        {/* System Status Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-700">システム状態</p>
                  <p className="font-semibold text-green-900">正常稼働中</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">最終更新</p>
                  <p className="font-semibold text-blue-900">
                    {new Date(systemHealth.lastScrapeTime).toLocaleTimeString('ja-JP')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700">今週の新着記事</p>
                  <p className="font-semibold text-purple-900">{systemHealth.articlesThisWeek} 件</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-700">ストレージ使用</p>
                  <p className="font-semibold text-orange-900">{Math.round(systemHealth.storageUsage * 100)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              概要
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              アクセス分析
            </TabsTrigger>
            <TabsTrigger value="automation" className="gap-2">
              <Zap className="w-4 h-4" />
              自動化
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="gap-2">
              <Cpu className="w-4 h-4" />
              改善提案
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              通知
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">総訪問者数</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {mockAnalyticsData.uniqueVisitors.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5% 先週比
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">総ページビュー</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {mockAnalyticsData.totalPageViews.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.3% 先週比
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">平均滞在時間</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {Math.floor(mockAnalyticsData.averageSessionDuration / 60)}m
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5.2% 先週比
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">直帰率</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {Math.round(mockAnalyticsData.bounceRate * 100)}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-red-600">
                    <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                    -2.1% 先週比
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">日別アクセス推移</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dailyStatsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        name="訪問者"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pageViews" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="ページビュー"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">カテゴリー別記事数</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {categoryData.map((cat, index) => (
                      <div key={cat.name} className="flex items-center gap-1 text-xs">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        {cat.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">人気ページ TOP 5</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topPagesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={150} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3B82F6" name="ページビュー" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">詳細アクセスデータ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">ページ</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">ビュー数</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">ユニーク訪問者</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-700">平均滞在時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAnalyticsData.topPages.map((page, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{page.path}</td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {page.views.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {page.uniqueVisitors.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {Math.floor(page.avgTimeOnPage / 60)}m {page.avgTimeOnPage % 60}s
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    コンテンツソース
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: '3D Printing Industry', status: 'active', lastUpdate: '2時間前' },
                    { name: '3Dnatives', status: 'active', lastUpdate: '4時間前' },
                    { name: 'MONOist', status: 'active', lastUpdate: '1時間前' },
                    { name: 'TCT Magazine', status: 'paused', lastUpdate: '2日前' },
                    { name: 'Sculpteo Blog', status: 'active', lastUpdate: '6時間前' },
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          source.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className="font-medium text-gray-900">{source.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{source.lastUpdate}</span>
                        <Badge variant={source.status === 'active' ? 'default' : 'secondary'}>
                          {source.status === 'active' ? '稼働中' : '一時停止'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    AI処理ステータス
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">自動翻訳</span>
                      <span className="text-sm font-medium text-green-600">正常</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">コンテンツ要約</span>
                      <span className="text-sm font-medium text-green-600">正常</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">画像生成</span>
                      <span className="text-sm font-medium text-green-600">正常</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">SEO最適化</span>
                      <span className="text-sm font-medium text-yellow-600">要調整</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">次回の自動更新スケジュール</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">次回の自動収集</p>
                      <p className="text-sm text-gray-600">
                        {new Date(systemHealth.nextScheduledScrape).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    今すぐ実行
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <div className="grid gap-4">
              {improvementSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className={`${
                  suggestion.implemented ? 'opacity-60' : ''
                }`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            suggestion.type === 'content' ? 'default' :
                            suggestion.type === 'ux' ? 'secondary' :
                            suggestion.type === 'seo' ? 'outline' : 'destructive'
                          }>
                            {suggestion.type === 'content' ? 'コンテンツ' :
                             suggestion.type === 'ux' ? 'UX' :
                             suggestion.type === 'seo' ? 'SEO' : 'パフォーマンス'}
                          </Badge>
                          <Badge variant={
                            suggestion.impact === 'high' ? 'default' :
                            suggestion.impact === 'medium' ? 'secondary' : 'outline'
                          }>
                            影響: {suggestion.impact === 'high' ? '高' :
                                   suggestion.impact === 'medium' ? '中' : '低'}
                          </Badge>
                          {suggestion.autoImplementable && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              自動実装可能
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                        <p className="text-gray-600 text-sm">{suggestion.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {suggestion.autoImplementable && !suggestion.implemented && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            自動実装
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          詳細
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`${
                  notification.read ? 'opacity-60' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.type === 'info' ? 'bg-blue-100' :
                        notification.type === 'warning' ? 'bg-yellow-100' :
                        notification.type === 'alert' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {notification.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
                        {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                        {notification.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                        {notification.type === 'suggestion' && <Zap className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleString('ja-JP')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
