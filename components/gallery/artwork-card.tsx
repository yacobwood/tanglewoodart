/**
 * Artwork Card Component
 * Museum-style card with spotlight hover effect, responsive images, and badges
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice, type Artwork } from '@/lib/artworks';
import { Badge } from '@/components/ui/badge';

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
  height?: string;
  lazy?: boolean;
}

export default function ArtworkCard({ artwork, priority = false, height = 'aspect-[4/5]', lazy = false }: ArtworkCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <Link
        href={`/art/${artwork.slug}`}
        className="group block relative bg-museum-charcoal border border-museum-slate rounded-sm overflow-hidden transition-all duration-400 ease-museum hover:scale-[1.03] hover:shadow-spotlight hover:border-museum-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
        aria-label={`View ${artwork.title} by ${artwork.artist}`}
      >
        {/* Image Container */}
        <div className={`relative ${height} bg-museum-dark overflow-hidden`}>
          {lazy ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              data-src={artwork.images[0]?.url || ''}
              alt={artwork.images[0]?.alt || `${artwork.title} - ${artwork.medium} painting by ${artwork.artist}, ${artwork.year}`}
              className={`w-full h-full object-scale-down transition-all duration-400 ease-museum ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          ) : (
            <Image
              src={artwork.images[0]?.url || ''}
              alt={artwork.images[0]?.alt || `${artwork.title} - ${artwork.medium} painting by ${artwork.artist}, ${artwork.year}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-scale-down transition-all duration-400 ease-museum ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
              priority={priority}
              quality={75}
            />
          )}

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-museum-dark via-museum-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-museum" />

          {/* Title Overlay (appears on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-museum">
            <h3 className="font-serif text-lg text-museum-cream mb-1 leading-tight">
              {artwork.title}
            </h3>
            <p className="text-sm text-museum-cream/70">
              {artwork.artist}, {artwork.year}
            </p>
          </div>

          {/* Badges Container (top-right) */}
          {(artwork.featured || artwork.availability !== 'available') && (
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              {artwork.featured && (
                <Badge variant="gold" size="sm">
                  Featured
                </Badge>
              )}
              {artwork.availability === 'sold' && (
                <Badge variant="muted" size="sm">
                  Sold
                </Badge>
              )}
              {artwork.availability === 'reserved' && (
                <Badge variant="muted" size="sm">
                  Reserved
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-4">
          <div className="flex items-baseline justify-between gap-2">
            {/* Price */}
            <span className="font-serif text-xl text-museum-gold">
              {formatPrice(artwork.price)}
            </span>

            {/* Medium */}
            <span className="text-xs text-museum-cream/60 uppercase tracking-wide">
              {artwork.medium}
            </span>
          </div>

          {/* Category */}
          <p className="mt-2 text-sm text-museum-cream/70 capitalize">
            {artwork.category.replace('-', ' ')}
          </p>
        </div>

        {/* Focus Indicator Enhancement */}
        <span className="sr-only">
          {artwork.title} - {formatPrice(artwork.price)} - {artwork.availability === 'available' ? 'Available' : artwork.availability === 'reserved' ? 'Reserved' : 'Sold'}
        </span>
      </Link>
    </motion.article>
  );
}

/**
 * Skeleton loader for artwork card
 */
export function ArtworkCardSkeleton() {
  return (
    <div className="bg-museum-charcoal border border-museum-slate rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-museum-slate/30" />
      <div className="p-4">
        <div className="h-6 bg-museum-slate/30 rounded w-2/3 mb-2" />
        <div className="h-4 bg-museum-slate/30 rounded w-1/3" />
      </div>
    </div>
  );
}
