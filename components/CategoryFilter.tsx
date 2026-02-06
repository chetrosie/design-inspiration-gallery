'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiX } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // 从URL参数中获取当前选中的分类
    const category = searchParams.get('category');
    setSelectedCategory(category);
  }, [searchParams]);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    
    // 更新URL参数
    const params = new URLSearchParams(searchParams.toString());
    
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">分类筛选</h3>
        {selectedCategory && (
          <button
            onClick={() => handleCategoryClick(null)}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FiX className="mr-1" />
            清除筛选
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-3 py-1 text-sm rounded-full ${
            selectedCategory === null
              ? 'bg-primary-100 text-primary-800 border border-primary-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedCategory === category.slug
                ? 'bg-primary-100 text-primary-800 border border-primary-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}