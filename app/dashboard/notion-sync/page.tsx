'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { FiArrowLeft, FiRefreshCw, FiDatabase } from 'react-icons/fi';

export default function NotionSyncDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setError(null);
    setSyncResult(null);
    
    try {
      const res = await fetch('/api/notion/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSyncResult(data);
      } else {
        setError(data.error || '同步失败');
      }
    } catch (err: any) {
      setError(err.message || '同步过程中发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <FiArrowLeft className="mr-1" />
              返回
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Notion同步</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiDatabase className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Notion数据库同步</h3>
                <p className="mt-2 text-sm text-gray-500">
                  将Notion数据库中的设计灵感同步到本地系统。这将导入新的灵感内容并更新现有内容。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">同步控制</h2>
              <button
                onClick={handleSync}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <FiRefreshCw className={`-ml-1 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? '同步中...' : '立即同步'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiDatabase className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">同步错误</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {syncResult && (
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiDatabase className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">同步成功</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{syncResult.message}</p>
                      <p className="mt-1">共同步 {syncResult.data.length} 个灵感</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">配置说明</h3>
              <div className="mt-2 bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  要启用Notion同步功能，请在环境变量中配置以下信息：
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• <code className="bg-gray-100 px-1 rounded">NOTION_TOKEN</code>: Notion集成令牌</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">NOTION_DATABASE_ID</code>: Notion数据库ID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}