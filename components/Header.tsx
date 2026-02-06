'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut, FiPlus, FiHome } from 'react-icons/fi';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">InspireHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              首页
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              分类
            </Link>
            <Link href="/tags" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              标签
            </Link>
            
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  控制台
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  <FiLogOut className="mr-1" /> 退出
                </button>
                <div className="flex items-center">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'User avatar'} 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <FiUser className="text-primary-600" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                <FiLogIn className="mr-1" /> 登录
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiHome className="mr-2" /> 首页
            </Link>
            <Link 
              href="/categories" 
              className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              分类
            </Link>
            <Link 
              href="/tags" 
              className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              标签
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUser className="mr-2" /> 控制台
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium w-full text-left"
                >
                  <FiLogOut className="mr-2" /> 退出
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signIn();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium w-full text-left"
              >
                <FiLogIn className="mr-2" /> 登录
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}