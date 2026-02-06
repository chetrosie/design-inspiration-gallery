'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiEye, FiTag } from 'react-icons/fi';
import { Category, Tag, Inspiration } from '@prisma/client';
import ImageWithFallback from '@/components/ImageWithFallback';

type InspirationWithRelations = Inspiration & {
  category: Category | null;
  tags: Tag[];
};

interface InspirationGridProps {
  inspirations: InspirationWithRelations[];
}

export default function InspirationGrid({ inspirations }: InspirationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {inspirations.map((inspiration) => (
        <motion.div
          key={inspiration.id}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <Link href={`/inspiration/${inspiration.id}`}>
            <div className="relative h-60">
              <ImageWithFallback
                src={inspiration.imageUrl}
                alt={inspiration.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {inspiration.title}
            </h3>
            
            {inspiration.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {inspiration.description}
              </p>
            )}
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {inspiration.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {inspiration.category.name}
                  </span>
                )}
                
                {inspiration.author && (
                  <span className="text-xs text-gray-500">
                    by {inspiration.author}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-gray-500">
                  <FiHeart className="mr-1" />
                  <span>{inspiration.likes}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiEye className="mr-1" />
                  <span>{inspiration.views}</span>
                </div>
              </div>
            </div>
            
            {inspiration.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {inspiration.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag.id} 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    <FiTag className="mr-1" />
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
        </motion.div>
      ))}
    </div>
  );
}