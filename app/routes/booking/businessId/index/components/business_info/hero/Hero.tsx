import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Image } from '~/components/ui/image/image';

import { useHero } from './useHero';

export function Hero() {
  const { currentImageIndex, images, business, nextImage, prevImage, setCurrentImageIndex } =
    useHero();

  return (
    <>
      <div className="relative h-[40vh] sm:h-[50vh] w-full">
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </div>
        <Image
          src={images[currentImageIndex]?.url || '/img/booking/placeholder.png'}
          alt="Main Image"
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 text-white">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{business?.name}</h1>
          <p className="text-sm md:text-lg opacity-90">
            {business?.business_tag.map((tag) => tag.name).join(', ')}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 md:h-2 w-4 md:w-8 rounded-full transition-all ${
                currentImageIndex === index ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
