'use client';

import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function NotionSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      const res = await fetch('/api/sync/notion', {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (data.success) {
        setLastSync(new Date().toLocaleString('zh-CN'));
        alert(`同步成功！${data.message}`);
      } else {
        alert(`同步失败: ${data.error}`);
      }
    } catch (error) {
      console.error('同步失败:', error);
      alert('同步失败，请重试');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        <FiRefreshCw className={`mr-1 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
        {isSyncing ? '同步中...' : '同步Notion'}
      </button>
      
      {lastSync && (
        <span className="ml-2 text-xs text-gray-500">
          最后同步: {lastSync}
        </span>
      )}
    </div>
  );
}