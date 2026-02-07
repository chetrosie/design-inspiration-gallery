import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import Link from 'next/link';
import NotionSyncButton from '@/components/NotionSyncButton';
import { FiPlus, FiGrid, FiTag, FiFolder, FiSettings, FiRefreshCw, FiHeart } from 'react-icons/fi';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 如果没有登录，重定向到登录页面
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  // 获取当前用户的统计数据
  const userStats = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      _count: {
        select: {
          inspirations: true,
        },
      },
    },
  });

  const totalInspirations = userStats?._count?.inspirations || 0;

  // 获取最近添加的灵感
  const recentInspirations = await prisma.inspiration.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">控制台</h1>
            <p className="mt-2 text-gray-600">管理你的设计灵感收藏</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiGrid className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">总灵感数</p>
                  <p className="text-2xl font-semibold text-gray-900">{totalInspirations}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiFolder className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">分类数</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiTag className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">标签数</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiHeart className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">获赞数</p>
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">快速操作</h2>
                  <NotionSyncButton />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link 
                    href="/dashboard/inspirations/new"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <FiPlus className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">添加灵感</h3>
                      <p className="text-sm text-gray-500">添加新的设计灵感</p>
                    </div>
                  </Link>

                  <Link 
                    href="/dashboard/categories"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <FiFolder className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">管理分类</h3>
                      <p className="text-sm text-gray-500">创建和编辑分类</p>
                    </div>
                  </Link>

                  <Link 
                    href="/dashboard/tags"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <FiTag className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">管理标签</h3>
                      <p className="text-sm text-gray-500">创建和编辑标签</p>
                    </div>
                  </Link>

                  <Link 
                    href="/dashboard/settings"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary-100 text-primary-600">
                        <FiSettings className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">设置</h3>
                      <p className="text-sm text-gray-500">账户和系统设置</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">最近添加</h2>
                {recentInspirations.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {recentInspirations.map((inspiration) => (
                      <li key={inspiration.id} className="py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-md bg-gray-200 overflow-hidden">
                              <img 
                                src={inspiration.imageUrl} 
                                alt={inspiration.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 truncate">{inspiration.title}</p>
                            <p className="text-xs text-gray-500">
                              {inspiration.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">暂无灵感</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}