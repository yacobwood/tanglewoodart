/**
 * Featured Section Component
 * Grid of featured artworks for homepage
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ArtworkCard from '@/components/gallery/artwork-card';
import { Button } from '@/components/ui/button';
import type { Artwork } from '@/lib/artworks';

interface FeaturedSectionProps {
  artworks: Artwork[];
}

export default function FeaturedSection({ artworks }: FeaturedSectionProps) {
  if (artworks.length === 0) {
    return null;
  }

  return (
    <section className="section py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-museum-cream mb-4">
            Featured Works
          </h2>
          <p className="text-lg text-museum-cream/80 max-w-2xl mx-auto">
            A selection of original paintings currently available for acquisition
          </p>
        </motion.div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              priority={index < 3}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-center"
        >
          <Button asChild size="lg" variant="secondary">
            <Link href="/gallery">View All Artworks</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
