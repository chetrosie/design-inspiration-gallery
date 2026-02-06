export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/inspirations',
    '/api/categories',
    '/api/tags',
    '/api/sync/:path*',
  ],
};