'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiEye, FiTag, FiExternalLink } from 'react-icons/fi';
import { Category, Tag, Inspiration } from '@prisma/client';
import ImageWithFallback from '@/components/ImageWithFallback';

type InspirationWithRelations = Inspiration & {
  category: Category | null;
  tags: Tag[];
};

interface InspirationCardProps {
  inspiration: InspirationWithRelations;
}

export default function InspirationCard({ inspiration }: InspirationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <Link href={`/inspiration/${inspiration.id}`}>
          <div className="relative h-64 w-full">
            <ImageWithFallback
              src={inspiration.imageUrl}
              alt={inspiration.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        
        {inspiration.link && (
          <a 
            href={inspiration.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <FiExternalLink className="text-gray-700" />
          </a>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">{inspiration.title}</h3>
          
          <div className="flex items-center space-x-2 ml-2">
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
        
        {inspiration.description && (
          <p className="mt-2 text-gray-600">
            {inspiration.description}
          </p>
        )}
        
        {inspiration.prompt && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 font-mono">
              {inspiration.prompt}
            </p>
          </div>
        )}
        
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            {inspiration.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {inspiration.category.name}
              </span>
            )}
            
            {inspiration.author && (
              <span className="text-sm text-gray-500">
                by {inspiration.author}
              </span>
            )}
          </div>
        </div>
        
        {inspiration.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {inspiration.tags.map((tag) => (
              <span 
                key={tag.id} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                <FiTag className="mr-1" />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}