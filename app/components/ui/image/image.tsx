import { Suspense, useEffect, useState } from 'react';
import { Await } from 'react-router';

import { Loading } from '~/components/ui/loading';

interface ImageProps {
  src: string | Promise<{ url: string; alt: string }>;
  alt: string;
  className?: string;
  loadingClassName?: string;
}

function ImageContent({ src, alt, className, loadingClassName = 'w-full h-full' }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof src === 'string') {
      const img = document.createElement('img');
      img.src = src;

      img.onload = () => {
        setIsLoading(false);
      };

      img.onerror = () => {
        setError(new Error('Failed to load image'));
        setIsLoading(false);
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [src]);

  if (typeof src === 'string') {
    if (error) {
      return (
        <div className="flex items-center justify-center bg-gray-100">Failed to load image</div>
      );
    }

    if (isLoading) {
      return <Loading className={loadingClassName} />;
    }

    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <Await resolve={src}>
      {(resolvedData) => (
        <img src={resolvedData.url} alt={resolvedData.alt} className={className} />
      )}
    </Await>
  );
}

export function Image({ src, alt, className, loadingClassName }: ImageProps) {
  if (typeof src === 'string') {
    return (
      <ImageContent src={src} alt={alt} className={className} loadingClassName={loadingClassName} />
    );
  }

  return (
    <Suspense fallback={<Loading className={loadingClassName} />}>
      <ImageContent src={src} alt={alt} className={className} loadingClassName={loadingClassName} />
    </Suspense>
  );
}
