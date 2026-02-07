import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import InspirationGrid from '@/components/InspirationGrid';
import { FiSearch } from 'react-icons/fi';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  
  // 搜索灵感
  const inspirations = await prisma.inspiration.findMany({
    where: {
      isPublic: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { prompt: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 24,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">搜索结果</h1>
            <div className="mt-2 flex items-center text-gray-600">
              <FiSearch className="mr-2" />
              <span>关键词: &quot;{query}&quot;</span>
              <span className="mx-2">•</span>
              <span>{inspirations.length} 个结果</span>
            </div>
          </div>

          {inspirations.length > 0 ? (
            <InspirationGrid inspirations={inspirations as any} />
          ) : (
            <div className="text-center py-12">
              <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">未找到相关内容</h3>
              <p className="mt-1 text-sm text-gray-500">
                没有找到与 &quot;{query}&quot; 相关的灵感
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
