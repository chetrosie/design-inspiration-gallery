import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import InspirationGrid from '@/components/InspirationGrid';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // 获取分类信息
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
  });

  // 如果分类不存在，返回404
  if (!category) {
    return notFound();
  }

  // 获取该分类下的灵感
  const inspirations = await prisma.inspiration.findMany({
    where: {
      categoryId: category.id,
      isPublic: true,
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-gray-600">{category.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {inspirations.length} 个灵感
            </p>
          </div>

          {inspirations.length > 0 ? (
            <InspirationGrid inspirations={inspirations as any} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">该分类下暂无灵感</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}