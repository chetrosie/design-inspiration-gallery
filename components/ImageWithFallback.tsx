'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  sizes,
  width,
  height,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fixedWidth = width ?? 400;
  const fixedHeight = height ?? 300;

  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      style={fill ? undefined : { width: fixedWidth, height: fixedHeight }}
    >
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-sm">图片加载失败</div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          priority={priority}
          {...(fill
            ? { fill: true as const, sizes: sizes ?? '100vw' }
            : { width: fixedWidth, height: fixedHeight })}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className || ''}`}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
        />
      )}

      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}
