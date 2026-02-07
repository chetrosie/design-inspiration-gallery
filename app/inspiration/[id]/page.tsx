import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import InspirationCard from '@/components/InspirationCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function InspirationDetailPage({ params }: { params: { id: string } }) {
  // 获取灵感详情
  const inspiration = await prisma.inspiration.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      tags: true,
    },
  });

  // 如果找不到灵感，返回404
  if (!inspiration) {
    return notFound();
  }

  // 增加浏览量
  await prisma.inspiration.update({
    where: {
      id: params.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  // 获取相关灵感（同一分类的其他灵感）
  const relatedInspirations = await prisma.inspiration.findMany({
    where: {
      categoryId: inspiration.categoryId,
      id: {
        not: inspiration.id,
      },
      isPublic: true,
    },
    include: {
      category: true,
      tags: true,
    },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InspirationCard inspiration={inspiration as any} />
          
          {relatedInspirations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">相关灵感</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedInspirations.map((relatedInspiration) => (
                  <div key={relatedInspiration.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/inspiration/${relatedInspiration.id}`} className="block">
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={relatedInspiration.imageUrl}
                          alt={relatedInspiration.title}
                          width={600}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 truncate">{relatedInspiration.title}</h3>
                        {relatedInspiration.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {relatedInspiration.category.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
