import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SeoHead({
  title = 'Design Inspiration Gallery - 设计灵感收藏馆',
  description = '收集、分享和发现优秀的设计灵感',
  image = '/og-image.jpg',
  url = 'https://your-domain.com',
}: SeoHeadProps) {
  const fullTitle = title;
  const fullDescription = description;
  const fullImage = `${url}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0ea5e9" />
    </Head>
  );
}