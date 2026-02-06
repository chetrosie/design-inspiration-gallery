import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                关于我们
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-primary-100">
                激发创意，连接设计灵感
              </p>
            </div>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">我们的使命</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                让设计灵感触手可及
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                我们致力于为设计师、创意工作者和艺术爱好者打造一个高质量的设计灵感收藏平台。
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">精选内容</h3>
                  <p className="mt-2 text-base text-gray-500">
                    我们精心挑选每一个设计作品，确保平台上的内容都具有启发性和参考价值。
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">快速搜索</h3>
                  <p className="mt-2 text-base text-gray-500">
                    强大的搜索和筛选功能，让你能够快速找到需要的设计灵感和参考资料。
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg md:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">社区共享</h3>
                  <p className="mt-2 text-base text-gray-500">
                    用户可以贡献自己的设计作品和发现的灵感，共同建设一个丰富的设计资源库。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900">我们的故事</h2>
                <div className="mt-6 prose prose-primary text-gray-500">
                  <p>
                    Design Inspiration Gallery诞生于一群设计师对优质设计资源的渴望。在日常工作中，我们发现很难找到一个集中、高质量且易于浏览的设计灵感平台。
                  </p>
                  <p>
                    于是我们决定自己创建这样一个平台，不仅满足自己的需求，也希望能帮助更多的设计师和创意工作者发现灵感、提升创作效率。
                  </p>
                  <p>
                    我们相信好的设计来源于不断的观察、学习和创新。通过收集和整理来自世界各地的优秀设计作品，我们希望能够激发更多人的创造力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}