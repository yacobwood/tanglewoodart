'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Artwork } from '@/lib/artworks';
import Lightbox from './lightbox';
import { Button } from '@/components/ui/button';

interface ImageViewerProps {
  artwork: Artwork;
}

export default function ImageViewer({ artwork }: ImageViewerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Calculate aspect ratio from artwork dimensions
  const aspectRatio = artwork.dimensions.width / artwork.dimensions.height;
  const aspectClass = aspectRatio > 1 ? 'aspect-[16/9]' : aspectRatio < 1 ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className={`group relative ${aspectClass} overflow-hidden rounded-lg border border-museum-slate bg-museum-charcoal`}>
        <Image
          src={artwork.images[0]?.url || ''}
          alt={artwork.images[0]?.alt || artwork.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          quality={75}
          priority
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-museum-dark/0 transition-all duration-300 group-hover:bg-museum-dark/20" />

        {/* Zoom button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 top-4 rounded-lg bg-museum-dark/80 p-3 text-museum-cream opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-museum-dark hover:text-museum-gold group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
          aria-label="View full-screen image"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>

      {/* Action Button */}
      <Button
        variant="secondary"
        size="md"
        onClick={() => setLightboxOpen(true)}
        className="w-full"
      >
        <Maximize2 className="mr-2 h-4 w-4" />
        View Full Size
      </Button>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          artwork={artwork}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
