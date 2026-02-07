'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ImageWithFallback from '@/components/ImageWithFallback';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft, FiImage } from 'react-icons/fi';

interface Inspiration {
  id: string;
  title: string;
  imageUrl: string;
  author: string | null;
  category: {
    name: string;
  } | null;
  tags: {
    name: string;
  }[];
  isPublic: boolean;
  createdAt: string;
}

export default function InspirationsDashboard() {
  const router = useRouter();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取所有灵感
  useEffect(() => {
    fetchInspirations();
  }, []);

  const fetchInspirations = async () => {
    try {
      const res = await fetch('/api/inspirations');
      const data = await res.json();
      
      if (data.success) {
        setInspirations(data.data);
      }
    } catch (error) {
      console.error('获取灵感失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/inspirations/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个灵感吗？')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/inspirations/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (data.success) {
        // 重新获取灵感列表
        fetchInspirations();
      } else {
        alert(data.error || '删除失败');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <FiArrowLeft className="mr-1" />
              返回
            </button>
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-2xl font-bold text-gray-900">灵感管理</h1>
              <button
                onClick={() => router.push('/dashboard/inspirations/new')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                添加灵感
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : inspirations.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {inspirations.map((inspiration) => (
                  <li key={inspiration.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-200">
                          {inspiration.imageUrl ? (
                            <ImageWithFallback 
                              src={inspiration.imageUrl} 
                              alt={inspiration.title} 
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <FiImage className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">{inspiration.title}</h3>
                          <div className="flex items-center mt-1">
                            {inspiration.category && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                                {inspiration.category.name}
                              </span>
                            )}
                            {!inspiration.isPublic && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                                草稿
                              </span>
                            )}
                            {inspiration.author && (
                              <span className="text-xs text-gray-500">
                                by {inspiration.author}
                              </span>
                            )}
                          </div>
                          {inspiration.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {inspiration.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag.name} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {tag.name}
                                </span>
                              ))}
                              {inspiration.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  +{inspiration.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(inspiration.id)}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inspiration.id)}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">暂无灵感</h3>
              <p className="mt-1 text-sm text-gray-500">开始添加你的第一个灵感吧</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/dashboard/inspirations/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                  添加灵感
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}