import Header from '@/components/Header';
import InspirationGrid from '@/components/InspirationGrid';
import { prisma } from '@/lib/db';
import { Category, Tag, Inspiration } from '@prisma/client';

type InspirationWithRelations = Inspiration & {
  category: Category | null;
  tags: Tag[];
};

export default async function Home() {
  // 获取公开的灵感内容，按创建时间倒序排列
  const inspirations = await prisma.inspiration.findMany({
    where: {
      isPublic: true,
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 12,
  });

  // 获取所有分类
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                设计灵感收藏馆
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-primary-100">
                收集、分享和发现优秀的设计灵感
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">热门分类</h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                浏览不同领域的设计灵感
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="group relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3 truncate">
                        <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Latest Inspirations */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">最新灵感</h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                发现最新的设计作品和创意
              </p>
            </div>

            <div className="mt-10">
              <InspirationGrid inspirations={inspirations as InspirationWithRelations[]} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">
              &copy; 2024 InspireHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}