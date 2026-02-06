import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900">Design Inspiration Gallery</h3>
            <p className="mt-4 text-base text-gray-500">
              一个专注于收集和分享设计灵感的平台，帮助设计师发现和创造更好的作品。
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">导航</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900">首页</Link></li>
              <li><Link href="/categories" className="text-base text-gray-500 hover:text-gray-900">分类</Link></li>
              <li><Link href="/tags" className="text-base text-gray-500 hover:text-gray-900">标签</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">更多</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900">关于我们</Link></li>
              <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">联系我们</Link></li>
              <li><Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">隐私政策</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Design Inspiration Gallery. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}