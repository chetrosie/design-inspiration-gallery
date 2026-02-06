'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function NewInspirationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    author: '',
    prompt: '',
    categoryId: '',
    tagIds: [] as string[],
    isPublic: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 这里应该调用API创建灵感
      // 暂时模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 创建成功后跳转到仪表板
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('创建失败:', error);
      alert('创建失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <FiArrowLeft className="mr-1" />
              返回
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">添加新灵感</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* 标题 */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    标题 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* 描述 */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* 图片URL */}
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    图片URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="预览" 
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* 链接 */}
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                    来源链接
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* 作者 */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    作者
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Prompt */}
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                    Prompt
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows={3}
                    value={formData.prompt}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                    placeholder="如果这是AI生成的作品，请输入使用的Prompt"
                  />
                </div>

                {/* 分类 */}
                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                    分类
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">选择分类</option>
                    <option value="ui-design">UI设计</option>
                    <option value="illustration">插画</option>
                    <option value="photography">摄影</option>
                    <option value="branding">品牌设计</option>
                    <option value="web-design">网页设计</option>
                  </select>
                </div>

                {/* 标签 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    标签
                  </label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['现代', '极简', '抽象', '写实', '色彩丰富', '黑白', '3D', '平面'].map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          id={`tag-${tag}`}
                          name="tags"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          //onChange={(e) => handleTagChange(tag, e.target.checked)}
                        />
                        <label htmlFor={`tag-${tag}`} className="ml-2 text-sm text-gray-700">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 公开状态 */}
                <div className="flex items-center">
                  <input
                    id="isPublic"
                    name="isPublic"
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                    公开显示
                  </label>
                </div>

                {/* 提交按钮 */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    <FiSave className="-ml-1 mr-2 h-4 w-4" />
                    {isLoading ? '保存中...' : '保存'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}