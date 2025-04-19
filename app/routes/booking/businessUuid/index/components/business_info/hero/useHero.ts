import { useState } from 'react';
import { useLoaderData } from 'react-router';

import type { loader } from '../../../route';

export function useHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const data = useLoaderData<typeof loader>();
  const images = data?.images.filter((image) => image.is_hero) ?? [];
  const business = data?.business ?? null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return {
    currentImageIndex,
    images,
    business,
    nextImage,
    prevImage,
    setCurrentImageIndex,
  };
}
