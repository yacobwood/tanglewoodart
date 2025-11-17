'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork, formatPrice } from '@/lib/artworks';

interface RelatedArtworksProps {
  artworks: Artwork[];
}

export default function RelatedArtworks({ artworks }: RelatedArtworksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (!artworks || artworks.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {artworks.length > 3 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-museum-charcoal/90 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-gold hover:text-museum-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-museum-charcoal/90 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-gold hover:text-museum-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-museum flex gap-6 overflow-x-auto pb-4"
      >
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/art/${artwork.slug}`}
            className="group flex-shrink-0 w-80"
          >
            <article className="space-y-4">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-museum-slate bg-museum-charcoal">
                <Image
                  src={artwork.images[0]?.url || ''}
                  alt={artwork.images[0]?.alt || artwork.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-museum-dark/0 transition-all duration-300 group-hover:bg-museum-dark/20" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-lg bg-museum-gold px-6 py-3 font-semibold text-museum-dark shadow-lg">
                    View Details
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-museum-cream transition-colors group-hover:text-museum-gold">
                  {artwork.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-museum-cream/70">
                      {artwork.artist}, {artwork.year}
                    </p>
                    <p className="text-xs text-museum-cream/50">{artwork.medium}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-museum-gold">{formatPrice(artwork.price)}</p>
                    <p className="text-xs text-museum-cream/50">
                      {artwork.availability === 'available' ? 'Available' : artwork.availability === 'reserved' ? 'Reserved' : 'Sold'}
                    </p>
                  </div>
                </div>

                {artwork.series && (
                  <p className="text-xs text-museum-gold/70">
                    Part of: {artwork.series}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
